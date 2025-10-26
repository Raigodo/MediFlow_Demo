<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\DataAccess\Facades\AmbulanceCalls;
use App\Http\Resources\AmbulanceCall\AmbulanceCallPreviewPagination;

class AmbulanceCallController extends Controller
{

    public function index(Request $request, $client_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'creator'=> $request->query('creator'),
            'page'=> $request->query('page'),
        ];

        $ambulance_calls = AmbulanceCalls::paginated($client_id, $filter);

        return Inertia::render("clients/ambulance-calls/index",[
            'collections.paginated'=> [
                'ambulanceCalls'=> new AmbulanceCallPreviewPagination(
                    $ambulance_calls,
                    $filter
                ),
            ],
        ]);
    }


    public function show($client_id, $note_id, $ambulance_call_id)
    {
        return Inertia::render('clients/ambulance-calls/show');
    }

}
