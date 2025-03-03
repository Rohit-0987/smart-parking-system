<?php

namespace App\Http\Controllers\Parking;

use App\Http\Controllers\CRUD\GetDetail as CRUDGetDetail;
use App\Models\Rate;
use Illuminate\Http\Request;

class GetRate extends CRUDGetDetail
{
    protected $modelName = Rate::class;

    protected function customQuery() {
        $this->id = Rate::where("parking_id", $this->id)->get()->last()->id;
    }
}
