<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\DataAccess\Facades\Invitations;
use App\Http\Requests\Invitation\StoreInvitationRequest;
use App\Http\Requests\Invitation\UpdateInvitationRequest;
use App\Http\Resources\Invitation\InvitationPreviewPagination;

class InvitationController extends Controller
{

    public function index(Request $request, $structure_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'used' => $request->query('used'),
            'page' => $request->query('page'),
        ];
        
        $invitations = Invitations::paginated($filter);
        
        return Inertia::render("structures/invitations/index",[
            'collections.paginated'=> [
                'invitations'=> new InvitationPreviewPagination(
                    $invitations,
                    $filter,
                ),
            ],
        ]);
    }


    public function show($structure_id, $invitation_id)
    {
        return Inertia::render("structures/invitations/show");
    }


    public function edit($structure_id, $invitation_id)
    {
        return Inertia::render('structures/invitations/edit');
    }


    public function update(UpdateInvitationRequest $request, $structure_id, $invitation_id)
    {
        $data = $request->validated();
        Invitations::update($invitation_id, $data);
        return to_route('invitation.index')->with('message', 'Invitation updated');
    }


    public function store(StoreInvitationRequest $request, $structure_id)
    {
        $data = $request->validated();
        Invitations::create([
            ...$data,
            'structure_id'=> CurrentContext::structureId(),
        ]);

        return to_route('invitation.index')->with('message', 'Invitation created');
    }



    public function destroy($structure_id, $invitation_id)
    {
        Invitations::delete($invitation_id);
        return to_route('invitation.index')->with('message', 'Invitation created');
    }
}
