<?php

namespace App\Http\Controllers\Parking;

use App\Http\Controllers\CRUD\GetDetail as CRUDGetDetail;
use App\Models\Parking;
use Illuminate\Http\Request;

class GetDetail extends CRUDGetDetail
{
    protected $modelName = Parking::class;

}
