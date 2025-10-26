<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Services\ModelSyncService;
use App\Services\CurrentContextService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use App\Services\SelectedContextService;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Model::preventLazyLoading(true);
        
        $this->app->singleton(ModelSyncService::class);
        $this->app->singleton(CurrentContextService::class);
        $this->app->singleton(SelectedContextService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Model::preventLazyLoading();

        JsonResource::withoutWrapping();

        Inertia::share([
            'message' => session('message'),
        ]);

    }
}
