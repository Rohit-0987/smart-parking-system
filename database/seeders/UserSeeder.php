<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => "Rohan Raje",
                'email' => 'user1@mail.com',
                'password' => Hash::make('123'),
                'phone' => '9435235235',
                'vehicle_no' => 'MH45AC9435',
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "Client user 2",
                'email' => 'user2@mail.com',
                'password' => Hash::make('123'),
                'phone' => '8545698574',
                'vehicle_no' => 'MH46AC9437',
                'role' => 'client',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "Ashish Kundra",
                'email' => 'user3@mail.com',
                'password' => Hash::make('123'),
                'phone' => '8547965820',
                'vehicle_no' => 'MH42AC8737',
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert multiple records
        DB::table('users')->insert($users);
    }
}
