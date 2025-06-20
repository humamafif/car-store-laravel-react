<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId =  Auth::id();

        $cartItem = Cart::where('user_id', $userId)
            ->where('car_id', $request->car_id)
            ->where('status', 'active')
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => $userId,
                'car_id' => $request->car_id,
                'quantity' => $request->quantity,
                'status' => 'active',
            ]);
        }
        return redirect()->back()->with('success', 'Produk berhasil ditambahkan ke keranjang!');
    }

    public function getCart()
    {
        $userId =  Auth::id();
        $cart = Cart::with('car')
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->get();

        return response()->json($cart);
    }

    public function cancel($id)
    {
        $userId = Auth::id();
        $cartItem = Cart::where('id', $id)
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->firstOrFail();

        $cartItem->status = 'cancelled';
        $cartItem->save();

        return redirect()->back()->with('success', 'Produk berhasil dihapus dari keranjang!');
    }
}
