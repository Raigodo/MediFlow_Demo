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
        Schema::create('clients', function (Blueprint $table) {
            $table->string("id")->primary();
            $table->string('name');
            $table->string('surname');
            $table->string('icon_key');
            $table->string('birth_date');
            $table->string('personal_code');
            $table->string('language');
            $table->string('religion');
            $table->string('weight');
            $table->string('height');
            $table->string('invalidity_group')->nullable();
            $table->string('invalidity_type')->nullable();
            $table->string('invalidity_expires_on')->nullable();
            $table->timestamp('joined_on');
            $table->timestamp('archived_on')->nullable();
            $table->timestamps();

            $table->foreignUlid('structure_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
