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
        Schema::create('user_forms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('first_name')->nullable();
            $table->string('surname')->nullable();
            $table->string('gender')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('telephone')->nullable();
            $table->string('email')->nullable();
            $table->string('loan_purpose')->nullable();
            $table->string('house_number')->nullable();
            $table->string('street_name')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('applicant_signature')->nullable();
            // Professional Data
            $table->string('profession')->nullable();
            $table->string('date_of_payment')->nullable();
            $table->string('codice_fiscale')->nullable();
            $table->string('bank_details')->nullable();
            $table->string('id_type')->nullable();
            $table->string('idcard_front')->nullable();
            $table->string('idcard_back')->nullable();
            // Guarantor Data
            $table->string('guarantor_first_name')->nullable();
            $table->string('guarantor_surname')->nullable();
            $table->string('guarantor_telephone')->nullable();
            $table->string('guarantor_street_name')->nullable();
            $table->string('guarantor_house_number')->nullable();
            $table->string('guarantor_city')->nullable();
            $table->string('guarantor_province')->nullable();
            $table->string('guarantor_postal_code')->nullable();
            $table->string('guarantor_id_type')->nullable();
            $table->string('guarantor_nationality')->nullable();
            $table->string('guarantor_signature')->nullable();
            $table->string('guarantor_idcard_front')->nullable();
            $table->string('guarantor_idcard_back')->nullable();
            // Office Use
            $table->string('amount');
            $table->string('rate');
            $table->string('total_amount');
            $table->string('number_of_months');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_forms');
    }
};
