<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Controllers\CRUD\FormAction as CRUDFormAction;
use Illuminate\Http\Request;

class FormAction extends CRUDFormAction
{
    protected $modelName = User::class;
}
