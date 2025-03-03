<?php

namespace App\Http\Controllers\Rate;

use App\Http\Controllers\Controller;
use App\Models\Rate;
use App\Http\Controllers\CRUD\FormAction as CRUDFormAction;
use Illuminate\Http\Request;

class FormAction extends CRUDFormAction
{
    protected $modelName = Rate::class;
}

