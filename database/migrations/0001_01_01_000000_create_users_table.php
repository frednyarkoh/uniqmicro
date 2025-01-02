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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // User's full name
            $table->string('email')->unique(); // Unique email address
            $table->timestamp('email_verified_at')->nullable(); // Email verification timestamp
            $table->string('password'); // Hashed password
            $table->rememberToken(); // Token for "remember me" functionality
            $table->timestamps(); // Created at and Updated at timestamps
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('email')->index(); // User email for password reset
            $table->string('token'); // Reset token
            $table->timestamp('created_at')->nullable(); // Token creation timestamp
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // Session ID
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade'); // Associated user ID
            $table->string('ip_address', 45)->nullable(); // IP address of the session
            $table->text('user_agent')->nullable(); // User agent of the session
            $table->longText('payload'); // Session data
            $table->integer('last_activity'); // Last activity timestamp
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
