<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Rate extends Model
{
    use HasFactory;
    protected $table = "rates";

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function parking(): BelongsTo
    {
        return $this->belongsTo(Parking::class,"parking_id","id");
    }
    public function booking()
    {
        return $this->hasMany(Booking::class);
    }
}
