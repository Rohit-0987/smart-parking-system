<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\CRUD\GetDetail as CRUDGetDetail;
use App\Models\Payment;
use Illuminate\Http\Request;

class GetDetail extends CRUDGetDetail
{
    protected $modelName = Payment::class;

}
