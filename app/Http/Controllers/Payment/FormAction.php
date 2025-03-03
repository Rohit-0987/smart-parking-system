<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Http\Controllers\CRUD\FormAction as CRUDFormAction;
use Illuminate\Http\Request;

class FormAction extends CRUDFormAction
{
    protected $modelName = Payment::class;
}
