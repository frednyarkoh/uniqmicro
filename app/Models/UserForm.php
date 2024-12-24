<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class UserForm extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        // Biodata
        'first_name', 'surname', 'gender', 'date_of_birth', 'nationality',
        'address', 'telephone', 'email',
        // Professional Data
        'profession', 'date_of_payment', 'codice_fiscale', 'bank_details',
        'id_type', 'idcard_front', 'idcard_back',
        // Guarantor Data
        'guarantor_first_name', 'guarantor_surname', 'guarantor_telephone',
        'guarantor_street_name', 'guarantor_house_number', 'guarantor_city',
        'guarantor_province', 'guarantor_postal_code', 'guarantor_id_type',
        'guarantor_idcard_front', 'guarantor_idcard_back',
    ];
}
