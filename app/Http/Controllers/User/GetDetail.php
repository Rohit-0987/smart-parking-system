<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CRUD\GetDetail as CRUDGetDetail;
use App\Models\User;
use Illuminate\Http\Request;

class GetDetail extends CRUDGetDetail
{
    protected $modelName = User::class;
    protected $with = ['workers', 'parking'];   

}
