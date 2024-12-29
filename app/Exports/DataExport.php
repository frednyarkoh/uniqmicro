<?php

namespace App\Exports;

use App\Models\UserForm;
use Maatwebsite\Excel\Concerns\FromCollection;

class DataExport implements FromCollection
{
    protected $query;

    public function __construct($query = null)
    {
        $this->query = $query;
    }

    public function collection()
    {
        if ($this->query) {
            $searchTerm = $this->query;

            return UserForm::where(function ($q) use ($searchTerm) {
                $q->where('first_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('surname', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('nationality', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('profession', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('guarantor_first_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('guarantor_last_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('telephone', 'LIKE', "%{$searchTerm}%");
            })->get();
        }

        return UserForm::all();
    }
}
