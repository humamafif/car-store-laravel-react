<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceCar extends Model
{
    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
