<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandsController extends Controller
{
    public function index()
    {
        $brands = Brand::latest()->get();
        return Inertia::render('admin/brands/index', ['brands' => $brands,]);
    }

    public function create()
    {
        return Inertia::render('admin/brands/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name',
        ]);

        $data = $request->all();

        Brand::create($data);

        return redirect()->route('brands.index')->with('success', 'Brand successfully created.');
    }

    public function edit(string $id)
    {
        $brand = Brand::findOrFail($id);
        return Inertia::render('admin/brands/edit', ['brand' => $brand]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $id,
        ]);

        $brand = Brand::findOrFail($id);
        $brand->update([
            'name' => $request->input('name'),
        ]);
        return redirect()->route('brands.index')->with('success', 'Brand successfully updated.');
    }

    public function destroy(string $id)
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();
        return redirect()->route('brands.index')->with('success', 'Brand successfully deleted.');
    }

    public function show(string $id)
    {
        return redirect()->route('brands.index');
    }
}
