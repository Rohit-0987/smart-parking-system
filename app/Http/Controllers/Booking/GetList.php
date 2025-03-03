<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\CRUD\GetList as CRUDGetList;
use App\Models\Booking;
use App\Models\Parking;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class GetList extends CRUDGetList
{
    protected $modelName = Booking::class;
    protected $with = ['payment', 'rate'];

    
    protected function customQuery() {
        
        $user = $this->request->user();
        if($user->role == "admin") {
            $parkingIds = Parking::select('owner_id')->where('owner_id', $user->id)->get()->toArray();
            $this->query->whereIn('parking_id', $parkingIds);
        }else if($user->role == "client") {
            $this->query->where('client_id', $user->id);
        }
    }
}
