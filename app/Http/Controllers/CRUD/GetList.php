<?php

namespace App\Http\Controllers\CRUD;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetList extends Controller
{
    protected $modelName;

    protected $with = [];

    protected $query;

    protected $request;

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
        return $this->query()->get();
    }

    protected function index(Request $request) {
        $this->request = $request;
        return $this->run();
    }
}

