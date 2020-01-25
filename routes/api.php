<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['guest:api']], function() {
    Route::post('authenticate', 'Auth\AuthController@login');
    Route::post('refresh', 'Auth\AuthController@refresh');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');
    Route::post('register', 'Auth\RegisterController@register');
});

Route::group(['middleware' => ['sameDomain']], function() {
    Route::get('categories', '\App\Http\Controllers\ForumCategoryController@getCategories');
    Route::get('subcategories', '\App\Http\Controllers\ForumSubcategoryController@getSubcategories');
    Route::get('threadsByCategory/{subcategoryId}', '\App\Http\Controllers\ForumSubcategoryController@getThreads');
    Route::get('postsByThreadId/{threadId}', '\App\Http\Controllers\ForumPostsController@getPostsByThreadId');
    Route::get('numThreadsByCategory/{subcategoryId}', '\App\Http\Controllers\ForumThreadsController@getNumberThreadsByCategory');
    Route::get('me', '\App\Http\Controllers\Auth\AuthController@me');
});

Route::group(['middleware' => ['jwt']], function() {
    Route::post('logout', '\App\Http\Controllers\Auth\AuthController@logout');
    Route::put('profile', 'ProfileController@update');
});
