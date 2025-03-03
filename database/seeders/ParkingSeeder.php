<?php

namespace Database\Seeders;

use App\Models\Parking;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class ParkingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parkings = [
            [
                'name' => "Raje's Parking Place",
                'street' => "Navle Road",
                'city' => "Pune",
                'state' => "Punjab",
                'pincode' => 411046,
                'country' => "India",
                'phone' => 873456789,
                'owner_id' => 1,
                'map_location' => 'https://maps.app.goo.gl/RrURTksqX9CgxHKB9',
                'capacity' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "Kundra's Parking",
                'street' => "FC Road",
                'city' => "Solapur",
                'state' => "Maharashtra",
                'pincode' => 411046,
                'country' => "India",
                'phone' => 883456789,
                'owner_id' => 3,
                'map_location' => 'https://maps.app.goo.gl/nEG2SVEQ1i7cVTof8',
                'capacity' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "Patil's Parking Places",
                'street' => "SB Road",
                'city' => "Pune",
                'state' => "Gujrat",
                'pincode' => 411886,
                'country' => "India",
                'phone' => 858956789,
                'owner_id' => 1,
                'map_location' => 'https://maps.app.goo.gl/AkJR1NrqDFmds99f8',
                'capacity' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => "Jhon's Parking",
                'street' => "Laxmi Narayan Road",
                'city' => "Solapur",
                'state' => "Gujrat",
                'pincode' => 411776,
                'country' => "India",
                'phone' => 858955289,
                'owner_id' => 3,
                'map_location' => 'https://maps.app.goo.gl/Ecp7ACNKYPPzVzWZA',
                'capacity' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ];

        // Insert multiple records
        DB::table('parkings')->insert($parkings);
    }
}
