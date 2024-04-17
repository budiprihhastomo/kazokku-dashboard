<?php

namespace App\Providers;

use App\Http\Services\Fixer;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class FixerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Fixer::class, function (Application $app) {
            return new Fixer(config('fixer.access_key'));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
