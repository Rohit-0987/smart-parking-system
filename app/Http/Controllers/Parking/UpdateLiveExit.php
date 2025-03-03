<?php

namespace App\Http\Controllers\Parking;

use App\Models\Booking;
use App\Models\LiveSlot;
use App\Models\Parking;
use App\Models\ParkingSlot;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class UpdateLiveExit
{
    public function index(Request $request) {
        $parking_id = $request->route('id');
        $slot_no = $request->route('slot_no');

        $parking_slots = LiveSlot::where('parking_id', $parking_id)->get()->first(); 
        if($parking_slots) {
            $slots = json_decode($parking_slots);    
            $slots = json_decode($slots->slots); 
            $slots[$slot_no - 1]->status = false;
            $parking_slots->slots = $slots;
            $parking_slots->save();

            return response()->json([
                'result' => true
            ]);
        }
        return response()->json([
            'result' => false
        ]);
    }
}
