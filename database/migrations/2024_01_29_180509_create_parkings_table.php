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
        Schema::create('parkings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('street')->nullable();
            $table->string('city');
            $table->string('state');
            $table->integer('pincode');
            $table->string('country');
            $table->integer('phone');
            $table->unsignedBigInteger('owner_id');
            $table->string('map_location');
            $table->string('capacity');
            
            $table->foreign('owner_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parkings');
    }
};
