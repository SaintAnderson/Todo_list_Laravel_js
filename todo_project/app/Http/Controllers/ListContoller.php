<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListRequest;
use App\Models\Todo;
use Illuminate\Http\Request;

class ListContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::orderBy('id', 'DESC')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ListRequest $request)
    {
        $todo = new Todo($request->all());
        $todo->user_id = auth()->id();
        $todo->save();
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
