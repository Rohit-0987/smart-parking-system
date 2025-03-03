<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;
    protected $table = "payments";

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function parking(): BelongsTo
    {
        return $this->belongsTo(Parking::class);
    }
    public function booking()
    {
        return $this->hasOne(Booking::class);
    }
}
