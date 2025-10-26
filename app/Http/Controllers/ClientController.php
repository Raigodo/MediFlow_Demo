<?php

namespace App\Http\Controllers;

use App\Services\CurrentContext;
use Inertia\Inertia;
use App\Services\ModelSync;
use Illuminate\Http\Request;
use App\Models\ClientContact;
use Illuminate\Support\Facades\Storage;
use App\Services\DataAccess\Facades\Clients;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Services\DataAccess\Facades\Structures;
use App\Http\Requests\Client\SetClientAvatarRequest;
use App\Http\Resources\Client\ClientPreviewPagination;

class ClientController extends Controller
{

    public function index(Request $request, $structure_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'archived' => false,
            'archived_from' => $request->query('archived_from'),
            'archived_to' => $request->query('archived_to'),
            'page' => $request->query('page'),
        ];

        $clients = Clients::paginated($filter);
        
        return Inertia::render("structures/clients/index",[
            'collections.paginated'=> [
                'clients'=> new ClientPreviewPagination(
                    $clients,
                    $filter
                ),
            ],
        ]);
    }

    public function archived(Request $request)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'archived'=> true,
            'archived_from' => $request->query('archived_from'),
            'archived_to' => $request->query('archived_to'),
            'page' => $request->query('page'),
        ];

        $clients = Clients::paginated($filter);
        
        return Inertia::render("clients/archived/index",[
            'collections.paginated'=> [
                'clients'=> new ClientPreviewPagination(
                    $clients,
                    $filter
                ),
            ],
        ]);
    }


    public function prompt()
    {
        return Inertia::render("clients/prompt-client");
    }


    public function baseData($client_id)
    {
        return Inertia::render('clients/show');
    }


    public function setIcon(SetClientAvatarRequest $request, $client_id)
    {
        $client = Clients::find($client_id) ?? abort(404);
        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $name = uniqid() . '.' . $extension;

        $success = Storage::putFileAs(
            'clients/icons/',
            $file,
            $name,
        );

        throw_if(!$success);

        if ($client->icon_key !== 'default.jpg'){
            $deleted = Storage::delete('clients/icons/' . $client->icon_key);
            throw_if(!$deleted);
        }
        $client->icon_key = $name;
        $client->save();

        Clients::invalidateAll($client->structure_id);

        return back()->with('message', 'Client icon changed');
    }


    public function edit($client_id)
    {
        return Inertia::render('clients/edit');
    }


    public function update(UpdateClientRequest $request, $client_id)
    {
        $data = $request->validated();
        $client = Clients::find($client_id) ?? abort(404);
        Clients::update($client->id, $data);

        ModelSync::syncRelatedModels(
            data: $data['contacts'],
            existingModels: $client->contacts,
            createFn: function (array $data) use($client) {
                ClientContact::factory()->create([
                    'client_id'=> $client->id,
                    ...$data,
                ]);
            },
            updateFn: function ($contact, array $data) use($client) {
                $contact->update($data);
            },
            deleteFn: function ($contact) use($client) {
                $contact->delete();
            },
        );

        return to_route('client.show', $client->id)->with('message', 'Client updated');
    }


    public function store(StoreClientRequest $request)
    {
        $data = $request->validated();
        $structure_id = CurrentContext::structureId();
        $structure = $structure_id ? Structures::findDetail($structure_id) : abort(404);
        $client = Clients::create([
            ...$data,
            'structure_id'=> $structure->id,
        ]);
        return to_route('client.show', $client->id)->with('message', 'Client created');
    }


    public function archive($client_id)
    {
        Clients::update($client_id, [
            'archived_on'=> now(),
        ]);
        return to_route('client.index', CurrentContext::structureId())
            ->with('message', 'Client archived');
    }


    public function unarchive($client_id)
    {
        Clients::update($client_id, [
            'archived_on'=> null,
        ]);
        return to_route('client.archived', CurrentContext::structureId())
            ->with('message', 'Client unarchived');
    }
}
