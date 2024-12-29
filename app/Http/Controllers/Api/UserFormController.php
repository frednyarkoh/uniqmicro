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

class UserFormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = UserForm::query();

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
        $users = $query->paginate(10);

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
        $query = $request->query('query'); // Get search query

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
            'First Name', 'Surname', 'Gender', 'Date of Birth', 'Nationality', 'Address', 'Telephone', 'Email',
            'Profession', 'Date of Payment', 'Codice Fiscale', 'Bank Details', 'ID Type',
            'ID Card Front', 'ID Card Back', 'Guarantor First Name', 'Guarantor Surname',
            'Guarantor Telephone', 'Guarantor Street Name', 'Guarantor House Number',
            'Guarantor City', 'Guarantor Province', 'Guarantor Postal Code', 'Guarantor ID Type',
            'Guarantor ID Card Front', 'Guarantor ID Card Back'
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
        $sheet->setCellValue('F' . $row, $record->address);
        $sheet->setCellValue('G' . $row, $record->telephone);
        $sheet->setCellValue('H' . $row, $record->email);
        $sheet->setCellValue('I' . $row, $record->profession);
        $sheet->setCellValue('J' . $row, $record->date_of_payment);
        $sheet->setCellValue('K' . $row, $record->codice_fiscale);
        $sheet->setCellValue('L' . $row, $record->bank_details);
        $sheet->setCellValue('M' . $row, $record->id_type);
        $sheet->setCellValue('N' . $row, $record->idcard_front);
        $sheet->setCellValue('O' . $row, $record->idcard_back);
        $sheet->setCellValue('P' . $row, $record->guarantor_first_name);
        $sheet->setCellValue('Q' . $row, $record->guarantor_surname);
        $sheet->setCellValue('R' . $row, $record->guarantor_telephone);
        $sheet->setCellValue('S' . $row, $record->guarantor_street_name);
        $sheet->setCellValue('T' . $row, $record->guarantor_house_number);
        $sheet->setCellValue('U' . $row, $record->guarantor_city);
        $sheet->setCellValue('V' . $row, $record->guarantor_province);
        $sheet->setCellValue('W' . $row, $record->guarantor_postal_code);
        $sheet->setCellValue('X' . $row, $record->guarantor_id_type);
        $sheet->setCellValue('Y' . $row, $record->guarantor_idcard_front);
        $sheet->setCellValue('Z' . $row, $record->guarantor_idcard_back);
        $row++;
    }

    // Auto-size columns
    foreach (range('A', 'Z') as $col) {
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
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'gender' => 'required|string',
            'date_of_birth' => 'required|date',
            'nationality' => 'required|string|max:255',
            'address' => 'required|string',
            'telephone' => 'required|string',
            'email' => 'required|email|max:255',
            // Professional Data
            'profession' => 'required|string|max:255',
            'date_of_payment' => 'required|date',
            'codice_fiscale' => 'required|string|max:255',
            'bank_details' => 'required|string|max:255',
            'id_type' => 'required|string|max:255',
            'idcard_front' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'idcard_back' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            // Guarantor Data
            'guarantor_first_name' => 'required|string|max:255',
            'guarantor_surname' => 'required|string|max:255',
            'guarantor_telephone' => 'required|string|max:255',
            'guarantor_street_name' => 'required|string|max:255',
            'guarantor_house_number' => 'required|string|max:255',
            'guarantor_city' => 'required|string|max:255',
            'guarantor_province' => 'required|string|max:255',
            'guarantor_postal_code' => 'required|string|max:255',
            'guarantor_id_type' => 'required|string|max:255',
            'guarantor_idcard_front' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
            'guarantor_idcard_back' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle file uploads
        if ($request->hasFile('idcard_front')) {
            $validatedData['idcard_front'] = $request->file('idcard_front')->store('idcards', 'public');
        }

        if ($request->hasFile('idcard_back')) {
            $validatedData['idcard_back'] = $request->file('idcard_back')->store('idcards', 'public');
        }

        if ($request->hasFile('guarantor_idcard_front')) {
            $validatedData['guarantor_idcard_front'] = $request->file('guarantor_idcard_front')->store('idcards', 'public');
        }

        if ($request->hasFile('guarantor_idcard_back')) {
            $validatedData['guarantor_idcard_back'] = $request->file('guarantor_idcard_back')->store('idcards', 'public');
        }

        // Save the form data
        $userForm = UserForm::create($validatedData);

        return response()->json([
            'message' => 'User data saved successfully!',
            'data' => $userForm,
        ], 201);
    
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserForm $userForm)
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
