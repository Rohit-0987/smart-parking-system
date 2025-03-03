<?php

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/bookings/{id?}', [App\Http\Controllers\Booking\FormAction::class, 'index']);
Route::post('/users/{id?}', [App\Http\Controllers\User\FormAction::class, 'index']);

Route::post('/parkings/{id?}', [App\Http\Controllers\Parking\FormAction::class, 'index']);
Route::post('/payments/{id?}', [App\Http\Controllers\Payment\FormAction::class, 'index']);

Route::post('/workers/{id?}', [App\Http\Controllers\Worker\FormAction::class, 'index']);
Route::post('/rates/{id?}', [App\Http\Controllers\Rate\FormAction::class, 'index']);

// Route::get('/bookings', [App\Http\Controllers\Booking\GetList::class, 'index']);
// Route::get('/bookings/{id}', [App\Http\Controllers\Booking\GetDetail::class, 'index']);

// Route::get('/users', [App\Http\Controllers\User\GetList::class, 'index']);
// Route::get('/users/{id}', [App\Http\Controllers\User\GetDetail::class, 'index']);

// Route::get('/parkings', [App\Http\Controllers\Parking\GetList::class, 'index']);
// Route::get('/parkings/{id}', [App\Http\Controllers\Parking\GetDetail::class, 'index']);
// Route::get('/parkings/{id}/rate', [App\Http\Controllers\Parking\GetRate::class, 'index']);
// Route::get('/parkings/{id}/check-availability', [App\Http\Controllers\Parking\CheckAvailability::class, 'index']);

// Route::get('/payments', [App\Http\Controllers\Payment\GetList::class, 'index']);
// Route::get('/payments/{id}', [App\Http\Controllers\Payment\GetDetail::class, 'index']);

// Route::get('/workers', [App\Http\Controllers\Worker\GetList::class, 'index']);
// Route::get('/workers/{id}', [App\Http\Controllers\Worker\GetDetail::class, 'index']);

// Route::get('/rates', [App\Http\Controllers\Rate\GetList::class, 'index']);
// Route::get('/rates/{id}', [App\Http\Controllers\Rate\GetDetail::class, 'index']);
