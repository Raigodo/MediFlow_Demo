<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\DataAccess\Facades\Medicaments;
use App\Http\Requests\Medicament\BatchStoreMedicamentRequest;
use App\Http\Resources\Medicament\MedicamentPreviewPagination;

class MedicamentController extends Controller
{
    public function index(Request $request)
    {
        $filter = [
            'page' => $request->query('page'),
        ];

        $medicaments = Medicaments::paginated($filter);

        return Inertia::render('medicaments/index',[
            'collections.paginated'=> [
                'medicaments'=> new MedicamentPreviewPagination(
                    $medicaments,
                    $filter,
                ),
            ],
        ]);
    }

    public function show($medicament_id)
    {
        return Inertia::render('medicaments/show');
    }

    public function supply()
    {
        return Inertia::render('medicaments/supply');
    }

    public function batchStore(BatchStoreMedicamentRequest $request)
    {
        $data = $request->validated();
        foreach ($data['medicaments'] as $medicament_fields)
        {
            $structure_id = CurrentContext::structureId();
            $medicament = Medicaments::findByType($medicament_fields['medicament_type_id']);

            if ($medicament) {
                Medicaments::update($medicament->id, [
                    'amount'=> $medicament->amount + (float)$medicament_fields['amount']
                ]);
            }
            else {
                Medicaments::create([
                    'structure_id'=> $structure_id,
                    'medicament_type_id'=> $medicament_fields['medicament_type_id'],
                    'amount'=> $medicament_fields['amount'],
                ]);
            }
        }

        return to_route('medicament.index')->with('message', 'Medicaments added');
    }
}
