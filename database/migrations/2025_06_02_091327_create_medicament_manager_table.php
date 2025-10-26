<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicament_managers', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->timestamps();

            $table->foreignUlid("employee_id")->constrained()->cascadeOnDelete();
            $table->foreignUlid('structure_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicament_managers');
    }
};
