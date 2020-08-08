<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\forum_posts;
use Faker\Generator as Faker;

$factory->define(forum_posts::class, function (Faker $faker) {

    $thread_id = \App\forum_threads::all()->random()->id;
    $count = \App\forum_threads::all()->where('thread_id', $thread_id)->loadCount('posts');

    return [
        'thread_id' => $thread_id,
        'user_id' => ($count === 0) ? \App\forum_threads::all()->where('thread_id', $thread_id)->first()->user_id : \App\User::all()->random()->id,
        'content' => $faker->paragraph,
    ];
});
