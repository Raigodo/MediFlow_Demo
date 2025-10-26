<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\DataAccess\Facades\Medications;
use App\Http\Resources\Medication\MedicationPreviewPagination;

class MedicationController extends Controller
{

    public function index(Request $request, $client_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'creator' => $request->query('creator'),
            'page' => $request->query('page'),
        ];

        $medications = Medications::paginated($client_id, $filter);
        
        return Inertia::render("clients/medications/index",[
            'collections.paginated'=>[
                'medications'=> new MedicationPreviewPagination(
                    $medications,
                    $filter,
                )
            ],
        ]);
    }


    public function show($client_id, $note_id, $medication_id)
    {
        return Inertia::render('clients/medications/show');
    }

}
