<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Manager;
use Illuminate\Http\Request;
use App\Models\DefaultStructure;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Services\DataAccess\Facades\Users;
use App\Services\DataAccess\Facades\Structures;
use App\Http\Requests\Structure\StoreStructureRequest;
use App\Http\Requests\Structure\UpdateStructureRequest;
use App\Http\Requests\Structure\SetStructureIconRequest;
use App\Http\Resources\Structure\StructurePreviewPagination;

class StructureController extends Controller
{


    public function index(Request $request, $user_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'role'=> $request->query('role'),
            'page'=> $request->query('page'),
        ];

        $structures = Structures::paginated($user_id, $filter);

        return Inertia::render("users/structures/index", [
            'collections.paginated'=> [
                'structures'=> new StructurePreviewPagination(
                    $structures,
                    $filter
                ),
            ],
        ]);
    }

    public function show($structure_id)
    {
        return Inertia::render("structures/show");
    }


    public function edit($structure_id)
    {
        return Inertia::render("structures/edit");
    }


    public function update(UpdateStructureRequest $request, $structure_id)
    {
        $data = $request->validated();
        Structures::update(CurrentContext::userId(), $structure_id, $data);
        return to_route('structure.show', $structure_id)->with('message', 'Structure updated');
    }


    public function store(StoreStructureRequest $request)
    {
        $data = $request->validated();
        $structure = Structures::create(CurrentContext::userId(), [
            "name"=> $data["name"],
        ]);

        Manager::factory()->create([
            "user_id"=> CurrentContext::userId(),
            "structure_id"=> $structure->id,
        ]);

        $default_structure = Structures::default(CurrentContext::userId());

        if ($default_structure){
            $default_structure->update([
                'structure_id'=> $structure->id,
            ]);
            $default_structure->save();
        }
        else{
            DefaultStructure::factory()->create([
                'structure_id'=> $structure->id,
                'user_id'=> CurrentContext::userId()
            ]);
        }

        session([
            'user_id'=> CurrentContext::userId(),
            'user_role'=> CurrentContext::userRole(),
            'structure_id'=> $structure->id,
            'employee_id'=> null,
            'employee_role'=> null,
        ]);

        return to_route("structure.show", $structure->id)->with('message', 'Structure created');
    }


    public function setIcon(SetStructureIconRequest $request, $structure_id)
    {
        $structure_id = CurrentContext::structureId();
        $structure = $structure_id ? Structures::findDetail($structure_id) : abort(404);

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $name = uniqid() . '.' . $extension;

        $success = Storage::putFileAs(
            'structures/icons/',
            $file,
            $name,
        );

        throw_if(!$success);

        if ($structure->icon_key !== 'default.jpg'){
            $deleted = Storage::delete('structures/icons/' . $structure->icon_key);

            throw_if(!$deleted);
        }
        $structure->icon_key = $name;
        $structure->save();

        Structures::invalidateAll(CurrentContext::userId());

        return back()->with('message', 'Structure icon updated');
    }


    public function destroy($structure_id)
    {
        $user_id = CurrentContext::userId();
        Structures::delete(CurrentContext::userId(), $structure_id);
        
        $current_structure_id = CurrentContext::structureId();
        if ($current_structure_id === $structure_id){
            $admin_id = CurrentContext::adminId();
            $user = CurrentContext::user();
            Session::regenerate();
            session([
                'user_id'=> $user->id,
                'user_role'=> $user->role->value,
                'structure_id'=> null,
                'employee_id'=> null,
                'employee_role'=> null,
                'admin_id'=> $admin_id,
            ]);
        }

        return to_route('structure.list', $user_id)->with('message', 'Structure deleted');
    }
}
