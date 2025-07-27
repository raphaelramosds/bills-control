<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Collection;
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
            ->get()
            ->map(fn($bill) => (new \DateTime($bill['expiration_date']))->format('Y-m'))
            ->unique()
            ->values();
    }

    public static function totals(Collection $bills)
    {
        $billsArray = is_array($bills) ? $bills : $bills->toArray();

        $total = array_sum(array_column($billsArray, 'amount'));

        $billIds = array_column($billsArray, 'id');

        $paid = Bill::whereIn('id', $billIds)
            ->whereNotNull('payment_date')
            ->groupBy('payment_date')
            ->selectRaw('SUM(amount) as payment_total')
            ->pluck('payment_total')
            ->sum();

        $pending = bcsub($total, $paid);

        return [
            'paid' => $paid,
            'pending' => $pending
        ];
    }
}
