<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserFormController;
// Example route
Route::middleware('api')->group(function () {
    Route::post('/upload/user-forms', [UserFormController::class, 'store']);
    Route::get('/fetch/user-data', [UserFormController::class, 'index']);
    Route::delete('/user-data/{id}', [UserFormController::class, 'destroy']);
});
