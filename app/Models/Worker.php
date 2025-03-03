<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Worker extends Model
{
    use HasFactory;
    protected $table = "workers";
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function parking(): BelongsTo
    {
        return $this->belongsTo(Parking::class, 'parking_id', 'id');
    }
}
