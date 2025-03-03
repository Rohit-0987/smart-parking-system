<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\CRUD\GetDetail as CRUDGetDetail;
use App\Models\Booking;
use Illuminate\Http\Request;

class GetDetail extends CRUDGetDetail
{
    protected $modelName = Booking::class;

}
