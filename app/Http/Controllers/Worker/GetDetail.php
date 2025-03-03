<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\CRUD\GetDetail as CRUDGetDetail;
use App\Models\Worker;
use Illuminate\Http\Request;

class GetDetail extends CRUDGetDetail
{
    protected $modelName = Worker::class;

}