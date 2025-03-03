<?php

namespace App\Http\Controllers\Rate;

use App\Http\Controllers\CRUD\GetDetail as CRUDGetDetail;
use App\Models\Rate;
use Illuminate\Http\Request;

class GetDetail extends CRUDGetDetail
{
    protected $modelName = Rate::class;

}
