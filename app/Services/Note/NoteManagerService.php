<?php

namespace App\Services\Note;

use App\Models\Note;
use App\Models\Client;
use App\Services\ModelSync;
use Illuminate\Support\Facades\DB;
use App\Services\DataAccess\Facades\Notes;
use App\Services\DataAccess\Facades\Diagnoses;
use App\Services\DataAccess\Facades\Medicaments;
use App\Services\DataAccess\Facades\Medications;
use App\Services\DataAccess\Facades\Measurements;
use App\Services\DataAccess\Facades\AmbulanceCalls;

class NoteManagerService 
{
    public function forceUpdate($client_id, $note_id, array $data)
    {
        DB::transaction(function () use($client_id, $note_id, $data) {
            $note = Notes::findDetail($client_id, $note_id);
            $ambulance_calls = $data['ambulance_calls'];
            $diagnoses = $data['diagnoses'];
            $measurements = $data['measurements'];
            $medications = $data['medications'];
            
            Notes::update($note->client_id, $note->id, [
                'is_important'=> $data['is_important'],
                'content'=> $data['content'],
            ]);

            $this->syncAmbulanceCalls($ambulance_calls, $note);

            $this->syncDiagnoses($diagnoses, $note);

            $this->syncMeasurements($measurements, $note);

            $this->syncMedications($medications, $note);

        });
    }

    public function upsert(Client $client, $employee_id, array $data)
    {
        DB::transaction(function () use($client, $employee_id, $data) {
            $client_id = $client->id;
            $ambulance_calls = $data['ambulance_calls'];
            $diagnoses = $data['diagnoses'];
            $measurements = $data['measurements'];
            $medications = $data['medications'];

            $note = $employee_id
                ? Notes::todaysDetails($client_id, $employee_id)
                : null;
            
            if ($note){
                Notes::update($note->client_id, $note->id, [
                    'is_important'=> $data['is_important'],
                    'content'=> $data['content'],
                ]);
            }
            else{
                $note = Notes::create($note->client_id, [
                    'content'=> $data['content'],
                    'is_important'=> $data['is_important'],
                    'client_id'=> $client_id,
                    'creator_id'=> $employee_id,
                ]);
            }

            $this->syncAmbulanceCalls($ambulance_calls, $note);

            $this->syncDiagnoses($diagnoses, $note);

            $this->syncMeasurements($measurements, $note);

            $this->syncMedications($medications, $note);

        });
    }

    function syncAmbulanceCalls(array $data, Note $note)
    {
        ModelSync::syncRelatedModels(
            $data,
            $note->ambulance_calls,
            function ($data)use($note) {
                AmbulanceCalls::create($note->client_id, [
                    'client_id'=> $note->client_id,
                    'creator_id'=> $note->creator_id,
                    'note_id'=> $note->id,
                    ...$data,
                ]);
            },
            function ($ambulance_call, $data){
                AmbulanceCalls::update($ambulance_call->note->client_id, $ambulance_call->id, $data);
            },
            function ($ambulance_call){
                AmbulanceCalls::delete($ambulance_call->note->client_id, $ambulance_call->id);
            },
        );
    }

    function syncDiagnoses(array $data, Note $note)
    {
        ModelSync::syncRelatedModels(
            $data,
            $note->diagnoses,
            createFn: function ($data) use($note) {
                Diagnoses::create($note->client_id, [
                    'client_id'=> $note->client_id,
                    'creator_id'=> $note->creator_id,
                    'note_id'=> $note->id,
                    ...$data
                ]);
            },
            updateFn: function ($diagnose, $data){
                Diagnoses::update($diagnose->note->client_id, $diagnose->id, $data);
            },
            deleteFn: function ($diagnose){
                Diagnoses::delete($diagnose->note->client_id, $diagnose->id);
            },
        );
    }

    function syncMeasurements(array $data, Note $note)
    {
        ModelSync::syncRelatedModels(
            $data,
            $note->measurements,
            createFn: function ($data) use($note){
                Measurements::create($note->client_id, [
                    'client_id'=> $note->client_id,
                    'creator_id'=> $note->creator_id,
                    'note_id'=> $note->id,
                    ...$data
                ]);
            },
            updateFn: function ($measurement, $data){
                Measurements::update($measurement->note->client_id, $measurement->id, $data);
            },
            deleteFn: function ($measurement){
                Measurements::delete($measurement->note->client_id, $measurement->id);
            },
        );
    }


    function syncMedications(array $data, Note $note)
    {
        ModelSync::syncRelatedModels(
            $data,
            $note->medications,
            createFn: function ($data) use($note) {
                $medicament = Medicaments::findByType($data['medicament_type_id']) 
                    ?? abort(404);

                Medicaments::update($medicament->id, [
                    'amount'=> $medicament->amount - (float) $data['amount'],
                ]);

                Medications::create($note->client_id, [
                    'client_id'=> $note->client_id,
                    'creator_id'=> $note->creator_id,
                    'note_id'=> $note->id,
                    ...$data,
                ]);
            },
            updateFn: function ($medication, $data) use($note) {
                $medicament = Medicaments::findByType($data['medicament_type_id']) 
                    ?? abort(404);

                $diff = $medication->amount - (float) $data['amount'];

                Medications::update($note->client_id, $medication->id, $data);
                medicaments::update($medicament->id, [
                    'amount'=> $medicament->amount + $diff,
                ]);
            },
            deleteFn: function ($medication) use($note) {
                $medicament = Medicaments::findByType($medication->medicament_type_id) 
                    ?? abort(404);
                
                Medicaments::update($medicament->id, [
                    'amount'=> $medicament->amount + (float)$medication->amount
                ]);
                
                Medications::delete($note->client_id, $medication->id);
            },
        );
    }





}
