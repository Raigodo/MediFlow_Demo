<?php

namespace App\Services\Actions;

use App\Models\Medicament;
use Illuminate\Support\Facades\Gate;


class MedicamentActionsFactory
{
    public function index()
    {
        return [
            'can'=> Gate::allows('list', [
                Medicament::class,
            ]),
            'method'=> 'GET',
            'url'=> route('medicament.index'),
        ];
    }

    
    public function show(Medicament $medicament)
    {
        return [
            'can'=> Gate::allows('view', [
                Medicament::class,
                $medicament,
            ]),
            'method'=> 'GET',
            'url'=> route('medicament.show', [
                'medicament'=> $medicament->id,
            ]),
        ];
    }

    
    public function supply()
    {
        return [
            'can'=> Gate::allows('supply', [
                Medicament::class,
            ]),
            'method'=> 'GET',
            'url'=> route('medicament.supply'),
        ];
    }

    
    public function batchStore()
    {
        return [
            'can'=> Gate::allows('supply', [
                Medicament::class,
            ]),
            'method'=> 'POST',
            'url'=> route('medicament.batch-store'),
        ];
    }

}