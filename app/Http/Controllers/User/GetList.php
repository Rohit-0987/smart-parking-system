<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\CRUD\GetList as CRUDGetList;
use App\Models\User;
use Illuminate\Http\Request;

class GetList extends CRUDGetList
{
    protected $modelName = User::class;
    protected $with = ['workers', 'parking'];   

    protected function customQuery() {
        $this->query->where('id', 1);
    }
}

