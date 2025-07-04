<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserForm;
use App\Exports\DataExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;
use Carbon\Carbon;

class UserFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = UserForm::query();
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        if ($request->filled('search_query')) {
            $searchTerm = $request->search_query;

            $query->where(function ($q) use ($searchTerm) {
                    $q->where('first_name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('surname', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('nationality', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('profession', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('guarantor_first_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('guarantor_surname', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('telephone', 'LIKE', "%{$searchTerm}%");
            });
        }

        $query->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
            $startDateParsed = Carbon::parse($startDate)->startOfDay();
            $endDateParsed = Carbon::parse($endDate)->endOfDay();

            return $query->whereBetween('user_forms.created_at', [$startDateParsed, $endDateParsed]);
        });
        
        $users = $query->paginate(15);

        return response()->json([
            'status' => 200,
            'message' => 'Users List',
            'users' => $users
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function export(Request $request)
    {
        $query = $request->query('query');

        // Example: Fetch filtered data from your database
        $data = UserForm::when($query, function ($q) use ($query) {
            $q->where('first_name', 'LIKE', "%{$query}%")
                ->orWhere('surname', 'LIKE', "%{$query}%")
                ->orWhere('nationality', 'LIKE', "%{$query}%")
                ->orWhere('profession', 'LIKE', "%{$query}%")
                ->orWhere('guarantor_first_name', 'LIKE', "%{$query}%")
                ->orWhere('guarantor_surname', 'LIKE', "%{$query}%")
                ->orWhere('telephone', 'LIKE', "%{$query}%");
        })->get();

        // Create a new Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Set Header Row
        $headers = [
            'First Name', 'Surname', 'Gender', 'Date of Birth', 'Nationality', 'Street Name',
            'House Number', 'City', 'Province', 'Postal Code', 'Telephone', 'Email',
            'Profession', 'Dates of Payment', 'Codice Fiscale', 'Bank Details', 'ID Type',
            'ID Card Front', 'ID Card Back', 'Guarantor First Name', 'Guarantor Surname',
            'Guarantor Telephone', 'Guarantor Street Name', 'Guarantor House Number',
            'Guarantor City', 'Guarantor Province', 'Guarantor Postal Code', 'Guarantor ID Type',
            'Guarantor ID Card Front', 'Guarantor ID Card Back', 'Principal Amount', 'Duration', 'Rate per month', 'Total Amount'
        ];

        // Set headers in the first row
    $column = 'A';
    foreach ($headers as $header) {
        $sheet->setCellValue($column . '1', $header);
        $column++;
    }

    // Apply bold styling to headers
    $sheet->getStyle('A1:' . $column . '1')->applyFromArray([
        'font' => [
            'bold' => true,
            'size' => 12,
        ],
        'alignment' => [
            'horizontal' => Alignment::HORIZONTAL_CENTER,
        ],
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => ['rgb' => 'D9E1F2'], // Light blue background for headers
        ],
    ]);

    // Populate data rows
    $row = 2;
    foreach ($data as $record) {
        $sheet->setCellValue('A' . $row, $record->first_name);
        $sheet->setCellValue('B' . $row, $record->surname);
        $sheet->setCellValue('C' . $row, $record->gender);
        $sheet->setCellValue('D' . $row, $record->date_of_birth);
        $sheet->setCellValue('E' . $row, $record->nationality);
        $sheet->setCellValue('F' . $row, $record->street_name);
        $sheet->setCellValue('G' . $row, $record->house_number);
        $sheet->setCellValue('H' . $row, $record->city);
        $sheet->setCellValue('I' . $row, $record->province);
        $sheet->setCellValue('J' . $row, $record->postal_code);
        $sheet->setCellValue('K' . $row, $record->telephone);
        $sheet->setCellValue('L' . $row, $record->email);
        $sheet->setCellValue('M' . $row, $record->profession);
        $sheet->setCellValue('N' . $row, $record->date_of_payment);
        $sheet->setCellValue('O' . $row, $record->codice_fiscale);
        $sheet->setCellValue('P' . $row, $record->bank_details);
        $sheet->setCellValue('Q' . $row, $record->id_type);
        $sheet->setCellValue('R' . $row, $record->idcard_front);
        $sheet->setCellValue('S' . $row, $record->idcard_back);
        $sheet->setCellValue('T' . $row, $record->guarantor_first_name);
        $sheet->setCellValue('U' . $row, $record->guarantor_surname);
        $sheet->setCellValue('V' . $row, $record->guarantor_telephone);
        $sheet->setCellValue('W' . $row, $record->guarantor_street_name);
        $sheet->setCellValue('X' . $row, $record->guarantor_house_number);
        $sheet->setCellValue('Y' . $row, $record->guarantor_city);
        $sheet->setCellValue('Z' . $row, $record->guarantor_province);
        $sheet->setCellValue('AA' . $row, $record->guarantor_postal_code);
        $sheet->setCellValue('AB' . $row, $record->guarantor_id_type);
        $sheet->setCellValue('AC' . $row, $record->guarantor_idcard_front);
        $sheet->setCellValue('AD' . $row, $record->guarantor_idcard_back);
        $sheet->setCellValue('AE' . $row, $record->amount);
        $sheet->setCellValue('AF' . $row, $record->number_of_months);
        $sheet->setCellValue('AG' . $row, $record->rate);
        $sheet->setCellValue('AH' . $row, $record->total_amount);
        
        $row++;
    }

    $columns = [];
    for ($col = 'A'; $col != 'AI'; $col++) {  // 'AI' is after 'AH'
        $columns[] = $col;
    }

    foreach ($columns as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

        // Create an Excel file and download it
        $writer = new Xlsx($spreadsheet);
        $fileName = 'data.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), $fileName);
        $writer->save($tempFile);

        return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // Biodata
            'first_name' => 'nullable|string|max:255',
            'surname' => 'nullable|string|max:255',
            'gender' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'nationality' => 'nullable|string|max:255',
            'telephone' => 'nullable|string',
            'street_name' => 'nullable|string',
            'house_number' => 'nullable|string',
            'city' => 'nullable|string',
            'province' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'email' => 'nullable|max:255',
            'applicant_signature' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
            // Professional Data
            'profession' => 'nullable|string|max:255',
            'date_of_payment' => 'nullable|string',
            'codice_fiscale' => 'nullable|string|max:255',
            'bank_details' => 'nullable|string|max:255',
            'id_type' => 'nullable|string|max:255',
            'loan_purpose' => 'nullable|string|max:255',
            'idcard_front' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
            'idcard_back' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
            // Guarantor Data
            'guarantor_first_name' => 'nullable|string|max:255',
            'guarantor_surname' => 'nullable|string|max:255',
            'guarantor_telephone' => 'nullable|string|max:255',
            'guarantor_street_name' => 'nullable|string|max:255',
            'guarantor_house_number' => 'nullable|string|max:255',
            'guarantor_city' => 'nullable|string|max:255',
            'guarantor_province' => 'nullable|string|max:255',
            'guarantor_postal_code' => 'nullable|string|max:255',
            'guarantor_id_type' => 'nullable|string|max:255',
            'guarantor_nationality' => 'nullable|string|max:255',
            'guarantor_signature' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
            'guarantor_idcard_front' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
            'guarantor_idcard_back' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
            // Office Use
            'amount' => 'required|string',
            'rate' => 'required|string',
            'total_amount' => 'required|string',
            'number_of_months' => 'required|string',
        ]);

        // Handle file uploads
        if ($request->hasFile('idcard_front')) {
            $validatedData['idcard_front'] = $request->file('idcard_front')->store('idcards', 'public');
        }

        if ($request->hasFile('idcard_back')) {
            $validatedData['idcard_back'] = $request->file('idcard_back')->store('idcards', 'public');
        }

        if ($request->hasFile('applicant_signature')) {
            $validatedData['applicant_signature'] = $request->file('applicant_signature')->store('signatures', 'public');
        }

        if ($request->hasFile('guarantor_idcard_front')) {
            $validatedData['guarantor_idcard_front'] = $request->file('guarantor_idcard_front')->store('idcards', 'public');
        }

        if ($request->hasFile('guarantor_idcard_back')) {
            $validatedData['guarantor_idcard_back'] = $request->file('guarantor_idcard_back')->store('idcards', 'public');
        }

        if ($request->hasFile('guarantor_signature')) {
            $validatedData['guarantor_signature'] = $request->file('guarantor_signature')->store('signatures', 'public');
        }

        // Save the form data
        $userForm = UserForm::create($validatedData);

        return response()->json([
            'message' => 'User data saved successfully!',
            'data' => $userForm,
        ], 201);
    
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            // Biodata
            'first_name' => 'nullable|string|max:255',
            'surname' => 'nullable|string|max:255',
            'gender' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'nationality' => 'nullable|string|max:255',
            'telephone' => 'nullable|string',
            'street_name' => 'nullable|string',
            'house_number' => 'nullable|string',
            'city' => 'nullable|string',
            'province' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'email' => 'nullable|max:255',
            // Professional Data
            'profession' => 'nullable|string|max:255',
            'date_of_payment' => 'nullable|string',
            'codice_fiscale' => 'nullable|string|max:255',
            'bank_details' => 'nullable|string|max:255',
            'id_type' => 'nullable|string|max:255',
            'loan_purpose' => 'nullable|string|max:255',
            // Guarantor Data
            'guarantor_first_name' => 'nullable|string|max:255',
            'guarantor_surname' => 'nullable|string|max:255',
            'guarantor_telephone' => 'nullable|string|max:255',
            'guarantor_street_name' => 'nullable|string|max:255',
            'guarantor_house_number' => 'nullable|string|max:255',
            'guarantor_city' => 'nullable|string|max:255',
            'guarantor_province' => 'nullable|string|max:255',
            'guarantor_postal_code' => 'nullable|string|max:255',
            'guarantor_id_type' => 'nullable|string|max:255',
            'guarantor_nationality' => 'nullable|string|max:255',
            // Office Use
            'amount' => 'nullable|string',
            'rate' => 'nullable|string',
            'total_amount' => 'nullable|string',
            'number_of_months' => 'nullable|string',
        ]);

        // Find the existing record
        $userForm = UserForm::findOrFail($id);

        // Handle file uploads
        if ($request->hasFile('idcard_front')) {
            $validatedData['idcard_front'] = $request->file('idcard_front')->store('idcards', 'public');
        }

        if ($request->hasFile('idcard_back')) {
            $validatedData['idcard_back'] = $request->file('idcard_back')->store('idcards', 'public');
        }

        if ($request->hasFile('applicant_signature')) {
            $validatedData['applicant_signature'] = $request->file('applicant_signature')->store('signatures', 'public');
        }

        if ($request->hasFile('guarantor_idcard_front')) {
            $validatedData['guarantor_idcard_front'] = $request->file('guarantor_idcard_front')->store('idcards', 'public');
        }

        if ($request->hasFile('guarantor_idcard_back')) {
            $validatedData['guarantor_idcard_back'] = $request->file('guarantor_idcard_back')->store('idcards', 'public');
        }

        if ($request->hasFile('guarantor_signature')) {
            $validatedData['guarantor_signature'] = $request->file('guarantor_signature')->store('signatures', 'public');
        }

        // Update the record
        $userForm->update($validatedData);

        return response()->json([
            'message' => 'User data updated successfully!',
            'data' => $userForm,
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(UserForm $userForm)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserForm $userForm)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = UserForm::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $userName = $user->first_name;

        $user->delete();

        return response()->json(['message' => $userName . ' User deleted successfully'], 200);
    }
}
