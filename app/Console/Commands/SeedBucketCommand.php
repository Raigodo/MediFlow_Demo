<?php

namespace App\Console\Commands;

use Illuminate\Http\File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class SeedBucketCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bucket:seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seeds default icons to S3 bucket';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePath = resource_path('files/default-client-icon.jpg'); // full path
        $file = new File($filePath);
        Storage::putFileAs(
            'clients/icons/',
            $file,
            'default.jpg',
        );

        
        $filePath = resource_path('files/default-structure-icon.jpg'); // full path
        $file = new File($filePath);
        Storage::putFileAs(
            'structures/icons/',
            $file,
            'default.jpg',
        );

        
        $filePath = resource_path('files/default-user-icon.jpg'); // full path
        $file = new File($filePath);
        Storage::putFileAs(
            'users/icons/',
            $file,
            'default.jpg',
        );
    }
}
