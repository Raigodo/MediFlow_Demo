<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ambulance_calls', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->string('result');
            $table->timestamps();

            $table->foreignUlid('note_id')->constrained()->cascadeOnDelete();

            $table->string('client_id');
            $table->foreign('client_id')
                ->references('id')->on('clients')
                ->cascadeOnDelete();

            $table->ulid('creator_id');
            $table->foreign('creator_id')
                ->references('id')->on('employees')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ambulance_calls');
    }
};
