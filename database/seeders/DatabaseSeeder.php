<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminUserRole = Role::create(['name' => 'admin']);
        $normalUserRole = Role::create(['name' => 'user']);

        $adminUser = User::factory()->create([
            'name' => 'Administrator User',
            'email' => 'admin@kazokku.com',
            'password' => Hash::make('admin')
        ]);

        $normalUser = User::factory()->create([
            'name' => 'Normal User',
            'email' => 'user@kazokku.com',
            'password' => Hash::make('user')
        ]);

        $adminUser->assignRole('admin', 'user');
        $normalUser->assignRole('user');
    }
}
