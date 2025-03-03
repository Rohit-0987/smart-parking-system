<?php

namespace App\Http\Controllers\Parking;

use App\Models\Booking;
use App\Models\Parking;
use Illuminate\Http\Request;

class CheckAvailability
{
    protected $modelName = Booking::class;



    public function index(Request $request) {
        $parking_id = $request->id;
        $date = $request->input("date");
        $start_time = $request->input("start_time");
        $end_time = $request->input("end_time");
        
        
        $date = date('Y-m-d', strtotime($date));
        $start_time = strtotime($start_time);
        $end_time = strtotime($end_time ? $end_time : '24:00:00');
        
        $capacity = Parking::find($parking_id)->capacity;
        $latestEndTime = strtotime("00:00:00");

        $bookings = Booking::where("parking_id", $parking_id)->whereDate('date', '=', $date)->orderBy('start_time')->get()->toArray();
        
        if(count($bookings) == 0) {
            return response()->json([
                "availability"=> true,
                "slot" => 0,
            ]);
        }

        array_push($bookings, [...$bookings[0], "start_time" => "24:00:00", "end_time" => "24:00:00"]);

        $availabilityResult = false;
        function nextActiveBooking($bookings, $start_index) {
            for($n = $start_index; $n < sizeof($bookings); $n++) {
                if (!array_key_exists('flag', $bookings[$n])) {
                    return $n;
                }
            }
        }

        
        // dd($bookings);
        // $capacity = 1; // $capacity make capacity
        $slot = 0;
        for($j = 0; $j < $capacity; $j++) {
            $slot = $j;
            $previousChecking = nextActiveBooking($bookings, 0);
            if($previousChecking !== sizeof($bookings) && strtotime($bookings[$previousChecking]['start_time']) >= $end_time) {
                $availabilityResult = true;
                break;
            }

            for ($i = 0; $i < sizeof($bookings) - 1; $i++) {
                if(($bookings[$i]["flag"] ?? true) == false) {
                    continue;
                }
                if($bookings[$i]['end_time'] == null && $bookings[$i]['fixed_end_time'] == 0) {
                    $bookings[$i]['end_time'] = '24:00:00';
                }
                $nextBooking = nextActiveBooking($bookings, $i + 1);

                if(
                    strtotime($bookings[$i]['end_time']) <= $start_time && 
                    strtotime($bookings[$nextBooking]['start_time']) >= $end_time
                ) {
                    $availabilityResult = true;
                    break;
                }else if($latestEndTime <= strtotime($bookings[$i]['start_time'])) {
                    $latestEndTime = strtotime($bookings[$i]['end_time']);
                    $bookings[$i]['flag'] = false;
                }
            }
            if($availabilityResult) {break; }
            $latestEndTime = strtotime("00:00:00");
        }

        return response()->json([
            "availability"=> $availabilityResult,
            "slot" => $slot,
            "available_slots" => $bookings
        ]);
    }
}