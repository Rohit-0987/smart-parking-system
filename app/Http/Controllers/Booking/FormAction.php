<?php

namespace App\Http\Controllers\Booking;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Http\Controllers\CRUD\FormAction as CRUDFormAction;
use App\Models\User;
use App\Notifications\BookingNotification;
use Exception;
use Illuminate\Http\Request;

class FormAction extends CRUDFormAction
{
    protected $modelName = Booking::class;

    protected function save() {
        $this->entity->save();

        $user = User::find($this->entity->client_id);
        
        $info = [
            "parking_name" => $this->entity->parking_id, 
            "name" => $user->name, 
            "start_time" => $this->entity->start_time, 
            "end_time" => $this->entity->end_time, 
            "total" => $this->entity->total, 
            "fixed_end_time" => $this->entity->fixed_end_time, 
            "date" => $this->entity->date, 
            "rate" => $this->entity->rate,
            "slot_number" =>  $this->entity->slot_no,
        ];
        $user->notify(new BookingNotification($info));
    }
}
