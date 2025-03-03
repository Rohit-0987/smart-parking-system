<?php

namespace Database\Seeders;

use App\Models\Parking;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Ramsey\Uuid\Type\Decimal;
use Ramsey\Uuid\Type\Integer;

class LiveSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slots5 = json_encode('[{"key":0,"label":0,"status":false},{"key":1,"label":1,"status":false},{"key":2,"label":2,"status":false},{"key":3,"label":3,"status":false},{"key":4,"label":4,"status":false}]');
        $slots4 = json_encode('[{"key":0,"label":0,"status":false},{"key":1,"label":1,"status":false},{"key":2,"label":2,"status":false},{"key":3,"label":3,"status":false}]');
        $slots = [
            [
                'parking_id' => 1,
                'slots' => json_decode($slots5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'parking_id' => 2,
                'slots' => json_decode($slots5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'parking_id' => 3,
                'slots' => json_decode($slots4),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'parking_id' => 4,
                'slots' => json_decode($slots4),
                'created_at' => now(),
                'updated_at' => now(),
            ]
            
        ];

        // Insert multiple records
        DB::table('live_slots')->insert($slots);
    }
}
