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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('booking_id');
            $table->unsignedBigInteger('parking_id');
            $table->string('transaction_id')->unique()->nullable();
            $table->string('payment_id')->unique();
            
            $table->foreign('client_id')->references('id')->on('users');
            $table->foreign('booking_id')->references('id')->on('bookings');
            $table->foreign('parking_id')->references('id')->on('parkings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
