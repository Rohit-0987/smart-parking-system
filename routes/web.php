<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

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

Route::get("/", function() {
    return redirect('dashboard');
})->name("home");

Route::middleware(['customGuest'])->group(function () {
    Route::view('/login', 'login')->name('login');
    Route::post('/login', [AuthController::class, 'postLogin']);
    
    Route::view('/signup', 'signup')->name('signup');
    Route::post('/signup', [AuthController::class, 'postSignup']);
    
});
Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('userAuth');
// Route::get('/api/bookings', [App\Http\Controllers\Booking\GetList::class, 'index'])->middleware('userAuth');


Route::get('/api/parkings/{id}/entry/{vehicle_no}', [App\Http\Controllers\Parking\GetEntry::class, 'index']);
Route::get('/api/parkings/{id}/exit/{vehicle_no}', [App\Http\Controllers\Parking\GetExit::class, 'index']);

Route::get('/api/parkings/{id}/live-entry/{slot_no}', [App\Http\Controllers\Parking\UpdateLiveEntry::class, 'index']);
Route::get('/api/parkings/{id}/live-exit/{slot_no}', [App\Http\Controllers\Parking\UpdateLiveExit::class, 'index']);
Route::get('/api/parkings/{id}/live', [App\Http\Controllers\Parking\GetLiveEntry::class, 'index']);

Route::get('/api/bookings', [App\Http\Controllers\Booking\GetList::class, 'index']);
Route::get('/api/bookings/{id}', [App\Http\Controllers\Booking\GetDetail::class, 'index']);

Route::get('/api/users', [App\Http\Controllers\User\GetList::class, 'index']);
Route::get('/api/users/{id}', [App\Http\Controllers\User\GetDetail::class, 'index']);

Route::get('/api/parkings', [App\Http\Controllers\Parking\GetList::class, 'index']);
Route::get('/api/parkings/{id}', [App\Http\Controllers\Parking\GetDetail::class, 'index']);
Route::get('/api/parkings/{id}/rate', [App\Http\Controllers\Parking\GetRate::class, 'index']);
Route::get('/api/parkings/{id}/check-availability', [App\Http\Controllers\Parking\CheckAvailability::class, 'index']);

Route::get('/api/payments', [App\Http\Controllers\Payment\GetList::class, 'index']);
Route::get('/api/payments/{id}', [App\Http\Controllers\Payment\GetDetail::class, 'index']);

Route::get('/api/workers', [App\Http\Controllers\Worker\GetList::class, 'index']);
Route::get('/api/workers/{id}', [App\Http\Controllers\Worker\GetDetail::class, 'index']);

Route::get('/api/rates', [App\Http\Controllers\Rate\GetList::class, 'index']);
Route::get('/api/rates/{id}', [App\Http\Controllers\Rate\GetDetail::class, 'index']);

Route::get("{any}", function(){
    return view("react");
})->where('any', '.*')->middleware('userAuth');
