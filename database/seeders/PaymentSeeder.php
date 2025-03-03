<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Parking;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $payments = [
            [
                'client_id' => 2,
                'booking_id' => 1,
                'parking_id' => 1,
                'transaction_id' => Str::random(10),
                'payment_id' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 2,
                'booking_id' => 2,
                'parking_id' => 3,
                'transaction_id' => Str::random(10),
                'payment_id' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more payment data as needed
        ];

        // Insert multiple records
        DB::table('payments')->insert($payments);
    }
}
