<?php

namespace App\Http\Controllers\Parking;

use App\Http\Controllers\Controller;
use App\Models\Parking;
use App\Http\Controllers\CRUD\FormAction as CRUDFormAction;
use Illuminate\Http\Request;

class FormAction extends CRUDFormAction
{
    protected $modelName = Parking::class;
}

