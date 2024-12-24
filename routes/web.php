<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // Laravel will automatically look for `app.blade.php`
})->where('any', '.*');