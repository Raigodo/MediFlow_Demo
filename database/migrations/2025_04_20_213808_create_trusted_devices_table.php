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
        Schema::create('trusted_devices', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->string('token_value');
            $table->string('note')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamps();

            $table->ulid('last_employee_id')->nullable();
            $table->foreign('last_employee_id')
                ->references('id')
                ->on('employees')
                ->nullOnDelete();

            $table->foreignUlid('structure_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trusted_devices');
    }
};
