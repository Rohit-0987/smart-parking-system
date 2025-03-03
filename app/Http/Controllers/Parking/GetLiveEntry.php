<?php

namespace App\Http\Controllers\Parking;

use App\Models\Booking;
use App\Models\LiveSlot;
use App\Models\Parking;
use App\Models\ParkingSlot;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class GetLiveEntry
{
    public function index(Request $request) {
        $parking_id = $request->route('id');
        $live_slots = LiveSlot::where('parking_id', $parking_id)->get();
        if($live_slots->count()) {
            return response()->json([
                'result' => true,
                'slots' => json_decode($live_slots->first()->slots)
            ]);
        }
        return response()->json([
            'result' => false,
            'slots' => ""
        ]);
    }
}
