<?php

namespace App\Http\Controllers\Rate;

use App\Http\Controllers\CRUD\GetList as CRUDGetList;
use App\Models\Rate;
use Illuminate\Http\Request;

class GetList extends CRUDGetList
{
    protected $modelName = Rate::class;
    protected $with = [];
}
