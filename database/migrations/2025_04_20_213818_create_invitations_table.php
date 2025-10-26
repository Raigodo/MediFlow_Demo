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
        Schema::create('invitations', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->integer('role');
            $table->string('token_value');
            $table->string('note')->nullable();
            $table->timestamps();

            $table->ulid('created_employee_id')->nullable();
            $table->foreign('created_employee_id')
                ->references('id')
                ->on('employees')
                ->cascadeOnDelete();

            $table->foreignUlid('structure_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
