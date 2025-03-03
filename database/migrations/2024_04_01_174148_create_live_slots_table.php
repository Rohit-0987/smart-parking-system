<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('live_slots', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parking_id');
            $table->json('slots');

            $table->foreign('parking_id')->references('id')->on('parkings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_slots');
    }
};
