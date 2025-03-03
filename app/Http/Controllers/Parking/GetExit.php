<?php

namespace App\Http\Controllers\Parking;

use App\Models\Booking;
use App\Models\Parking;
use App\Models\ParkingSlot;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class GetExit
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
                    ->where('status', 'in')
                    ->get()->last();

            if($booking) {
                $payment = Payment::where('id', $booking->id)->get();
                if(is_null($payment)) {
                    return response()->json([
                        'result' => false,
                        'message' => "Payment Not Done"
                    ]);
                }
    
                $booking->status = "out";
                $booking->save();

                $parking_slots = ParkingSlot::where('parking_id', $parking_id)->get()->first();
                if($parking_slots) {
                    $slots = json_decode($parking_slots);    
                    $slots = json_decode($slots->slots);    
                    $slots[$booking->slot_no]->status = false;
                    $parking_slots->slots = $slots;
                    $parking_slots->save();

                    return response()->json([
                        'result' => true
                    ]);
                }
            
            }
            return response()->json([
                'result' => false,
                'message' => "User ". $user->first()->name ." with this number and parking place has not checked In yet"
            ]);
        }

        return response()->json([
            'result' => false
        ]);
    }
}
