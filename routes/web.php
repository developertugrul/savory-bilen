<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [\App\Http\Controllers\Frontend\Home\IndexController::class, 'index'])->name("home");

Route::group([
    'prefix' => 'dashboard',
], function () {
    Route::view('/{path?}', 'dashboard')->where('path', '.+'); // This is for react router
});
Route::group([
    'prefix' => 'auth',
], function () {
    Route::view('/{path?}', 'dashboard')->where('path', '.+'); // This is for react router
});
