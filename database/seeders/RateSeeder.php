<?php

namespace Database\Seeders;

use App\Models\Parking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class RateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rates = [
            [
                'parking_id' => 1,
                'start_time' => '08:00:00',
                'end_time' => '18:00:00',
                'rate' => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'parking_id' => 2,
                'start_time' => '08:00:00',
                'end_time' => '18:00:00',
                'rate' => 70,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'parking_id' => 3,
                'start_time' => '08:00:00',
                'end_time' => '18:00:00',
                'rate' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'parking_id' => 4,
                'start_time' => '08:00:00',
                'end_time' => '18:00:00',
                'rate' => 90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert multiple records
        DB::table('rates')->insert($rates);
    }
}
