<?php

namespace Database\Seeders;

use App\Models\Parking;
use App\Models\Rate;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bookings = [
            [
                'client_id' => 2,
                'parking_id' => 1,
                'start_time' => Carbon::now()->setTime(0, 0, 0),
                'end_time' => Carbon::now()->setTime(1, 0, 0),
                'fixed_end_time' => true,
                'date' => now(),
                'rate_id' => 1,
                'total' => 40,
                'slot_no' => 0,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 2,
                'parking_id' => 3,
                'start_time' => Carbon::now()->setTime(0, 0, 0),
                'end_time' => Carbon::now()->setTime(4, 0, 0),
                'fixed_end_time' => true,
                'date' => now(),
                'rate_id' => 3,
                'total' => 120,
                'slot_no' => 0,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 2,
                'parking_id' => 2,
                'start_time' => Carbon::now()->setTime(7, 0, 0),
                'end_time' => null,
                'fixed_end_time' => false,
                'date' => now(),
                'rate_id' => 2,
                'total' => null,
                'slot_no' => 0,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more booking data as needed
        ];

        // Insert multiple records
        DB::table('bookings')->insert($bookings);
    }
}
