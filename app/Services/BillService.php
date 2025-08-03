<?php

namespace App\Services;

use App\Models\Bill;
use Illuminate\Http\Request;

class BillService
{
    public function index(Request $request): array
    {
        $bills = Bill::query();

        if ($request->get('month')) {
            [$year, $month] = explode('-', $request->get('month'));
            $bills->whereYear('expiration_date', $year)
                ->whereMonth('expiration_date', $month);
        }

        if ($request->has('order')) {
            $order = $request->get('order');
            $bills->orderBy($order);
        }

        $data = [
            'bills' => $bills->get(),
            'months' => Bill::months(),
            'totals' => Bill::totals($bills->get())
        ];

        return $data;
    }
}
