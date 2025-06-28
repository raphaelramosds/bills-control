<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $table = 'bills';

    protected $fillable = [
        'name',
        'amount',
        'expiration_date',
        'payment_date',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'expiration_date' => 'date',
        'payment_date' => 'date',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d');
    }

    public static function months()
    {
        return Bill::select('expiration_date')
            ->orderBy('expiration_date')
            ->distinct()
            ->get()
            ->transform(fn($bill) => (new \DateTime($bill['expiration_date']))->format('Y-m'));
    }
}
