<?php

namespace App\Http\Controllers\Parking;

use App\Models\Booking;
use App\Models\Parking;
use App\Models\ParkingSlot;
use App\Models\User;
use Illuminate\Http\Request;

class GetEntry
{
    public function index(Request $request) {
        $parking_id = $request->route('id');
        $vehicle_no = $request->route('vehicle_no');
        $vehicle_no = strtoupper($vehicle_no);

        $user = User::where('vehicle_no', $vehicle_no)->get();
        if($user->count()) {
            $user_id = $user->first()->id;
            $booking = Booking::where('client_id', $user_id)
                    ->where('parking_id', $parking_id)
                    ->where('status', 'pending')
                    ->get()->last();
            if($booking) {     
                $booking->status = "in";
                $booking->save();

                $parking_slots = ParkingSlot::where('parking_id', $parking_id)->get()->first();
                if($parking_slots) {
                    $slots = json_decode($parking_slots);  
                    $slots = json_decode($slots->slots);
                    $slots[$booking->slot_no]->status = true;
                    $parking_slots->slots = $slots;
                    $parking_slots->save();

                    return response()->json([
                        'result' => true
                    ]);
                }
            }
            return response()->json([
                'result' => false,
                'message' => "No Booking with this parking place for this user"
            ]);
        }
        return response()->json([
            'result' => false
        ]);
    }
}
