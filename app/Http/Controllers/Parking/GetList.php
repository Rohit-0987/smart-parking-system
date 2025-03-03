<?php

namespace App\Http\Controllers\Parking;

use App\Http\Controllers\CRUD\GetList as CRUDGetList;
use App\Models\Parking;
use Illuminate\Http\Request;

class GetList extends CRUDGetList
{
    protected $modelName = Parking::class;
    protected $with = [];

    protected function customQuery() {
        
        $user = $this->request->user();
        $role = $this->request->query('role');
        if($role == "admin") {
            $this->query->where('owner_id', $user->id);
        }
    }
}
