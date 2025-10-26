<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\DataAccess\Facades\Measurements;
use App\Http\Resources\Measurement\MeasurementPreviewPagination;

class MeasurementController extends Controller
{

    public function index(Request $request, $client_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'creator' => $request->query('creator'),
            'type' => $request->query('type'),
            'page' => $request->query('page'),
        ];

        $measurements = Measurements::paginated($client_id, $filter);

        return Inertia::render("clients/measurements/index",[
            'collections.paginated'=>[
                'measurements'=> new MeasurementPreviewPagination(
                    $measurements,
                    $filter,
                )
            ],
        ]);
    }


    public function show($client_id, $note_id, $measurement_id)
    {
        return Inertia::render('clients/measurements/show');
    }

}
