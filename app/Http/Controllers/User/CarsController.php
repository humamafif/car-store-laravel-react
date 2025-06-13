<?php

namespace App\Http\Controllers\User;

use App\Models\Car;
use Inertia\Inertia;

class CarsController
{
    public function index()
    {
        $cars = Car::with('brand')->get();
        return Inertia::render('welcome', [
            'cars' => $cars
        ]);
    }
}
