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

    // Forum API Calls
    Route::get('categories', '\App\Http\Controllers\Forum\ForumCategoryController@getCategories');
    Route::get('subcategories', '\App\Http\Controllers\Forum\ForumSubcategoryController@getSubcategories');
    Route::get('threadsByCategory/{subcategoryId}', '\App\Http\Controllers\Forum\ForumSubcategoryController@getThreads');
    Route::get('postsByThreadId/{threadId}/{pagination?}', '\App\Http\Controllers\Forum\ForumPostsController@getPostsByThreadId');
    Route::get('numThreadsByCategory/{subcategoryId}', '\App\Http\Controllers\Forum\ForumThreadsController@getNumberThreadsByCategory');
    Route::post('createThread', '\App\Http\Controllers\Forum\ForumThreadsController@create')->middleware('auth:api','throttle:rate_limit,1');

    Route::get('getRecentThreads/{amount}', '\App\Http\Controllers\Forum\ForumThreadsController@getRecentThreads');

    Route::get('/twitchdata/{gameid?}', '\App\Http\Controllers\Live\TwitchController@streamerData');
    Route::get('/friendly/{user}', '\App\Http\Controllers\Live\TwitchController@friendlyName');
    Route::get('/twitchuser/{user}', '\App\Http\Controllers\Live\TwitchController@getTwitchUser');
    Route::get('/profile/{userId}', '\App\Http\Controllers\ProfileController@getProfile');
    Route::get('getDiscordRoster', '\App\Http\Controllers\RosterController@getRosterData');
    Route::get('getAllSpells', '\App\Http\Controllers\Calc\ItemDbController@getAllSpells');
    Route::get('getAllItems', '\App\Http\Controllers\Calc\ItemDbController@getAllItems');
});

Route::group(['middleware' => ['jwt']], function() {
    Route::post('requestPostForumThread', '\App\Http\Controllers\Forum\ForumPostsController@newPost');
    Route::get('me', '\App\Http\Controllers\Auth\AuthController@me');
    Route::post('logout', '\App\Http\Controllers\Auth\AuthController@logout');
    Route::put('profile', 'ProfileController@update');
    Route::post('uploadProfileImage', 'ProfileController@updateProfilePic');
    Route::put('updateUserBio', 'ProfileController@updateUserBio');
});
