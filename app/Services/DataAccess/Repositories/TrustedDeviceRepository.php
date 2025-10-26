<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\TrustedDevice;
use Illuminate\Support\Carbon;

class TrustedDeviceRepository 
{

    public function paginated(string $structure_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $used = $filter['used'];
        $used_from = $filter['used_from'];
        $used_to = $filter['used_to'];
        $page = $filter['page'];

        $query = TrustedDevice::query()
            ->with([
                'last_employee',
                'last_employee.structure',
                'last_employee.user',
                'structure',
            ])
            ->where([
                'structure_id'=> $structure_id,
            ])
            ->orderByDesc('created_at');

        if ($created_from) {
            $query->where(
                'created_at',
                '>=',
                Carbon::parse($created_from)->startOfDay()
            );
        }

        if ($created_to) {
            $query->where(
                'created_at',
                '<=',
                Carbon::parse($created_to)->endOfDay()
            );
        }

        if ($used || $used_from || $used_to) {
            $query->whereNotNull('last_used_at');
        }

        if ($used_from) {
            $query->where(
                'last_used_at',
                '>=',
                Carbon::parse($used_from)->startOfDay()
            );
        }

        if ($used_to) {
            $query->where(
                'last_used_at',
                '<=',
                Carbon::parse($used_to)->startOfDay()
            );
        }

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }


    public function find(string $device_id)
    {
        return TrustedDevice::where([
            'id'=> $device_id,
        ])->first();
    }

    public function findDetail(string $device_id)
    {
        return TrustedDevice::with([
                'last_employee',
                'last_employee.structure',
                'last_employee.user',
                'structure',
            ])->where([
                'id'=> $device_id,
            ])->first();
    }

    public function findByToken(string $token_value)
    {
        return TrustedDevice::where([
                'token_value'=> $token_value,
            ])->first();
    }

    public function create(array $data)
    {
        return TrustedDevice::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = TrustedDevice::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $device_id)
    {
        $record = TrustedDevice::where([
                'id'=> $device_id,
            ])->first() ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
