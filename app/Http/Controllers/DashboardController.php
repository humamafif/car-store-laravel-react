<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $cars = Car::with('brand')->latest()->get();

        return Inertia::render('dashboard', [
            'cars' => $cars
        ]);
    }
}
