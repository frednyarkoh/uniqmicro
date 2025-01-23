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
            $table->string('first_name');
            $table->string('surname');
            $table->string('gender');
            $table->date('date_of_birth');
            $table->string('nationality');
            $table->string('telephone');
            $table->string('email');
            $table->string('loan_purpose');
            $table->string('house_number');
            $table->string('street_name');
            $table->string('city');
            $table->string('province');
            $table->string('postal_code');
            $table->string('applicant_signature')->nullable();
            // Professional Data
            $table->string('profession');
            $table->date('date_of_payment');
            $table->string('codice_fiscale');
            $table->string('bank_details');
            $table->string('id_type');
            $table->string('idcard_front')->nullable();
            $table->string('idcard_back')->nullable();
            // Guarantor Data
            $table->string('guarantor_first_name');
            $table->string('guarantor_surname');
            $table->string('guarantor_telephone');
            $table->string('guarantor_street_name');
            $table->string('guarantor_house_number');
            $table->string('guarantor_city');
            $table->string('guarantor_province');
            $table->string('guarantor_postal_code');
            $table->string('guarantor_id_type');
            $table->string('guarantor_nationality');
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
