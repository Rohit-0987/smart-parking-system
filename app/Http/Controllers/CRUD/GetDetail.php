<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetDetail extends Controller
{
    protected $modelName;

    protected $with = [];

    protected $query;

    protected $id;

    protected $request = Request::class;


    protected function customQuery() {}

    protected function with()
    {
        $this->query->with($this->with);
    }

    protected function query() 
    {
        $this->query = $this->modelName::query();
        $this->with();
        $this->customQuery();
        return $this->query;
    }

    protected function run() 
    {
        return $this->query()->find($this->id);
    }

    public function index() {
        $this->id = Route::input('id');
        return $this->run();
    }
}
