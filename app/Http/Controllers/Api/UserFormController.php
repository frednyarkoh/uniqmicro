<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
                    ->orWhere('guarantor_last_name', 'LIKE', "%{$searchTerm}%")
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
