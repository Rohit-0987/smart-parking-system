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

class WorkerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::inRandomOrder()->first(); 
        $parking = Parking::inRandomOrder()->first(); 
        $workers = [
            [
                'user_id' => $user->id,
                'parking_id' => $parking->id,
                'name' => Str::random(10),
                'phone' => 12345678,
                'created_at' => now(),
                'updated_at' => now(),
            ]
            
        ];

        // Insert multiple records
        DB::table('workers')->insert($workers);
    }
}
