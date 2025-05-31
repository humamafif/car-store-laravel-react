<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    //
    protected $fillable = [
        'brand_id',
        'image',
        'title',
        'description',
        'price',
        'stock',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }
}
