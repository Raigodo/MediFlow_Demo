<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\DataAccess\Facades\Diagnoses;
use App\Http\Resources\Diagnose\DiagnosePreviewPagination;

class DiagnoseController extends Controller
{

    public function index(Request $request, $client_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'archived' => $request->query('archived'),
            'archived_from'=> $request->query('archived_from'),
            'archived_to'=> $request->query('archived_to'),
            'creator' => $request->query('creator'),
            'page' => $request->query('page'),
        ];

        $diagnoses = Diagnoses::paginated($client_id, $filter);

        return Inertia::render("clients/diagnoses/index",[
            'collections.paginated'=> [
                'diagnoses'=> new DiagnosePreviewPagination(
                    $diagnoses,
                    $filter,
                ),
            ],
        ]);
    }


    public function show($client_id, $note_id, $diagnose_id)
    {
        return Inertia::render('clients/diagnoses/show');
    }


    public function archive($client_id, $note_id, $diagnose_id)
    {
        Diagnoses::update($diagnose_id, [
            'archived_on'=> now(),
        ]);
        
        return to_route('diagnose.index', $client_id)->with('message', 'Diagnose archived');
    }

}
