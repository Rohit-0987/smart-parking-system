<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Booking extends Model
{
    use HasFactory;
    protected $table = "bookings";
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function parking(): BelongsTo
    {
        return $this->belongsTo(Parking::class);
    }
    public function rate(): BelongsTo
    {
        return $this->belongsTo(Rate::class);
    }
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
