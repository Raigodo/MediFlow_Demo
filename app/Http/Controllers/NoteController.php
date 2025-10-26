<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Inertia\Inertia;
use App\Enums\EmployeeRole;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use App\Services\Note\NoteManager;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use App\Http\Requests\Note\StoreNoteRequest;
use App\Services\DataAccess\Facades\Clients;
use App\Services\DataAccess\Facades\Medicaments;
use App\Services\DataAccess\Facades\Medications;
use App\Http\Resources\Note\NotePreviewPagination;

class NoteController extends Controller
{

    public function prompt()
    {
        return Inertia::render("notes/prompt-client");
    }


    public function index(Request $request, $client_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'creator'=> $request->query('creator'),
            'role'=> EmployeeRole::TryFrom($request->query('role'))
                ?? EmployeeRole::TryFrom(CurrentContext::employeeRole()) 
                ?? EmployeeRole::NURSE,
            'flag'=> $request->query('flag'),
            'page'=> $request->query('page'),
        ];


        $notes = Notes::paginated($client_id, $filter);

        $filter['role'] = $request->query('role');

        return Inertia::render("notes/index", [
            'collections.paginated'=> [
                'notes'=> new NotePreviewPagination(
                    $notes, 
                    $filter
                ),
            ],
        ]);
    }


    public function show($client_id, $note_id)
    {
        $can_edit = Gate::allows('update', [
            Note::class,
            $client_id,
            $note_id,
        ]);
        return $can_edit
            ? Inertia::render("notes/write")
            : Inertia::render("notes/show");
    }


    public function forceEdit($client_id, $note_id)
    {
        return Inertia::render("notes/force-write");
    }


    public function forceUpdate(StoreNoteRequest $request, $client_id, $note_id)
    {
        $data = $request->validated();
        NoteManager::forceUpdate($client_id, $note_id, $data);
        return to_route('note.index', $client_id)->with('message', 'Daily note updated');
    }


    public function write($client_id)
    {
        $client = Clients::find($client_id);
        $employee_id = CurrentContext::employeeId();
        $note = $employee_id
            ? Notes::todaysDetails($client_id, $employee_id)
            : null;
            
        if ($note){
            SelectedContext::note($note);
        }
        else{
            $note = Notes::make($client->id);
            SelectedContext::tempNote($note);
        }

        return Inertia::render("notes/write");
    }


    public function store(StoreNoteRequest $request, $client_id)
    {
        $data = $request->validated();
        $client = Clients::findDetail($client_id);
        NoteManager::upsert($client, CurrentContext::employeeId(), $data);
        return to_route('note.index', $client_id)->with('message', 'Daily note updated');
    }


    public function destroy($client_id, $note_id)
    {
        $structure_id = CurrentContext::structureId();
        $medications = Medications::related($client_id, $note_id);
        $note = Notes::find($client_id, $note_id);

        foreach ($medications as $medication){
            
            $medicament = Medicaments::findByType($medication->medicament_type_id) 
                ?? abort(404);

            if ($medicament) {
                Medicaments::update($medicament->id, [
                    'amount'=> $medicament->amount + (float)$medication->amount
                ]);
            }
            else {
                Medicaments::create([
                    'structure_id'=> $structure_id,
                    'medicament_type_id'=> $medication->medicament_type_id,
                    'amount'=> $medication->amount,
                ]);
            }
            
            Medications::delete($client_id, $medication->id);
        }
        
        Notes::delete($client_id, $note_id);
        return to_route('note.index', $client_id)->with('message', 'Note deleted');
    }
}
