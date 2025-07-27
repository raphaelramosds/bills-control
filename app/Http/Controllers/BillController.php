<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillRequest;
use App\Models\Bill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : Response
    {
        $bills = Bill::query();

        if ($request->has('month')) {
            [$year, $month] = explode('-', $request->get('month'));
            $bills->whereYear('expiration_date', $year)
                ->whereMonth('expiration_date', $month);
        }

        return Inertia::render('bills/index', [
            'bills' => $bills->get(),
            'months' => Bill::months(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() : Response
    {
        return Inertia::render('bills/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBillRequest $request) : RedirectResponse
    {
        $validated = $request->validated();

        $bill = new Bill($validated);
        $bill->save();

        return to_route('bills.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) : Response
    {
        $bill = Bill::findOrFail($id);
        return Inertia::render('bills/form', compact('bill'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bill = Bill::findOrFail($id);
        $bill->update($request->all());
        return to_route('bills.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $bill = Bill::findOrFail($id);
        $bill->delete();
        return to_route('bills.index');
    }
}
