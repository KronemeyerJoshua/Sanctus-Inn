<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\forum_threads;
use Faker\Generator as Faker;

$factory->define(forum_threads::class, function (Faker $faker) {
    return [
        'subcategory_id' => \App\forum_subcategory::all()->random()->id,
        'title' => $faker->sentence,
        'user_id' => \App\User::all()->random()->id,
        'permission_id' => 1
    ];
});
