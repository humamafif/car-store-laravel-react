<?php

use App\Http\Controllers\BrandsController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\User\CarsController as UserCarsController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [UserCarsController::class, 'index'])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// ROUTING FOR ADMIN
Route::middleware(['auth', EnsureAdmin::class])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');

    Route::resource('/admin/cars', CarsController::class);
    Route::resource('/admin/brands', BrandsController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
