<?php

namespace App\Http\Controllers\CRUD;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class FormAction extends Controller
{
    protected $isUpdate = false;
    protected $id;
    protected $request;
    protected $entity;

    protected $modelName;

    protected function beforeRun() {
        $this->id = Route::input('id');
        $this->isUpdate = !!$this->id;
        $this->entity = $this->entity();
    }

    protected function entity() {
        return $this->isUpdate ? $this->modelName::findOrFail($this->id) : new $this->modelName;
    }

    protected function fill() {
        foreach($this->request->all() as $key => $value) {
            $this->entity->$key = $value;
        }
    }

    protected function save() {
        $this->entity->save();
    }

    protected function run() {
        $this->fill();
        $this->save();
    }

    protected function index(Request $request) {
        try{
            $this->request = $request;
            $this->beforeRun();
            $this->run();
            return $this->entity::find($this->entity->id);
        }catch (Exception $e) {
            return response()->json([
                'status'=> 500,
                'message'=> $e->getMessage(),
            ]);
        }
    }

}
