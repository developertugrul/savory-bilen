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

Route::domain('{subdomain}.' . config('app.short_url'))->group(function () {
    Route::get('/', function ($subdomain) {
        echo $subdomain; // this will output the subdomain
        // call the controller here
    });
    Route::controller('user', 'AuthController');
});

Route::view('/{path?}', 'index')->where('path', '.+'); // This is for react router
