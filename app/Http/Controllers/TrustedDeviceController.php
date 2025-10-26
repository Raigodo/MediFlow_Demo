<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Cookie;
use App\Services\DataAccess\Facades\Structures;
use App\Services\DataAccess\Facades\TrustedDevices;
use App\Http\Requests\TrustedDevice\UpdateTrustedDeviceRequest;
use App\Http\Resources\Devices\TrustedDevicePreviewPagination;

class TrustedDeviceController extends Controller
{

    public function index(Request $request, $structure_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'used' => $request->query('used'),
            'used_from' => $request->query('used_from'),
            'used_to' => $request->query('used_to'),
            'page' => $request->query('page'),
        ];

        $devices = TrustedDevices::paginated($filter);

        return Inertia::render("structures/devices/index",[
            'collections.paginated'=> [
                'devices'=> new TrustedDevicePreviewPagination(
                    $devices,
                    $filter,
                ),
            ],
        ]);
    }


    public function show($structure_id, $device_id)
    {
        return Inertia::render("structures/devices/show");
    }


    public function edit($structure_id, $device_id)
    {
        return Inertia::render("structures/devices/edit");
    }


    public function update(UpdateTrustedDeviceRequest $request, $structure_id, $device_id)
    {
        $data = $request->validated();
        TrustedDevices::update($device_id, $data);
        return to_route('device.show', $device_id)->with('message', 'Trusted device updated');
    }


    public function trust(Request $request, $structure_id)
    {
        $structure_id = CurrentContext::structureId();
        $token_value = $request->cookie('device_token');

        $trusted_device = TrustedDevices::findByToken($token_value);

        if ($trusted_device === null) {
            $trusted_device = TrustedDevices::create([
                'structure_id'=> $structure_id,
            ]);

            $cookie_lifetime = 2_629_800; //60 * 24 * 365.25 * 5 = 5 years

            $cookie = cookie(
                name: "device_token",
                value: $token_value,
                minutes: $cookie_lifetime);

            Cookie::queue($cookie);
        }

        return back()->with('message', 'Trust device succeeded');
    }


    public function untrust($structure_id)
    {
        $token_value = Cookie::get('device_token');
        $forget_cookie = Cookie::forget('device_token');
        Cookie::queue($forget_cookie);
        $device = TrustedDevices::findByToken($token_value);
        TrustedDevices::delete($device->id);

        return back()->with('message', 'Untrust device succeeded');
    }


    public function destroy($structure_id, $device_id)
    {
        TrustedDevices::delete($device_id);
        $forget_cookie = Cookie::forget('device_token');
        Cookie::queue($forget_cookie);
        return back()->with('message', 'Trusted device deleted');
    }
}
