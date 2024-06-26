<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListContoller;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/list', [ListContoller::class, 'index']);
Route::post('/list', [ListContoller::class, 'store']);

Route::get('/task/{id}', [\App\Http\Controllers\TaskController::class, 'show']);
Route::post('/task', [\App\Http\Controllers\TaskController::class, 'store']);
Route::delete('/task/{task}', [\App\Http\Controllers\TaskController::class, 'destroy']);

Route::get('/dashboard', function () {
    return view('todo');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
