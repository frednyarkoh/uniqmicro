<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserFormController;
use App\Models\UserForm;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;


Route::middleware('api')->group(function () {
    Route::post('/upload/user-forms', [UserFormController::class, 'store']);
    Route::post('/user-data/update/{id}', [UserFormController::class, 'update']);
    Route::get('/fetch/user-data', [UserFormController::class, 'index']);
    Route::delete('/user-data/{id}', [UserFormController::class, 'destroy']);
    Route::get('/export', [UserFormController::class, 'export']);

    Route::get('/user-forms/{id}/download-pdf', function ($id) {
        $userForm = UserForm::findOrFail($id);
    
        $pdf = Pdf::loadView('pdf.user-form', ['userForm' => $userForm]);
    
        return $pdf->download('user_form_' . $userForm->id . '.pdf');
    });
});
