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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('parking_id');
            $table->time('start_time');
            $table->time('end_time')->nullable()->default(null);
            $table->boolean('fixed_end_time')->default(true);
            $table->unsignedBigInteger('rate_id');
            $table->integer('total')->nullable()->default(null);

            $table->foreign('client_id')->references('id')->on('users');
            $table->foreign('parking_id')->references('id')->on('parkings');
            $table->foreign('rate_id')->references('id')->on('rates');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
