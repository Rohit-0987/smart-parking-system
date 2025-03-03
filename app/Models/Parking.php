<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Parking extends Model
{
    use HasFactory;
    protected $table = "parkings";
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function worker()
    {
        return $this->hasMany(Worker::class);
    }
    public function rate()
    {
        return $this->hasMany(Rate::class);
    }
    public function payment()
    {
        return $this->hasMany(Payment::class);
    }
    public function parking()
    {
        return $this->hasMany(Parking::class);
    }
    public function booking()
    {
        return $this->hasMany(Booking::class);
    }
}
