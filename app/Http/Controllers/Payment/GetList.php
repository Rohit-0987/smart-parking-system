<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\CRUD\GetList as CRUDGetList;
use App\Models\Parking;
use App\Models\Payment;
use Illuminate\Http\Request;

class GetList extends CRUDGetList
{
    protected $modelName = Payment::class;
    protected $with = [];

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

