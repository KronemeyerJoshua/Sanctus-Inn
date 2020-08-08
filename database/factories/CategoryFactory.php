<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\forum_category;
use Faker\Generator as Faker;

$factory->define(forum_category::class, function (Faker $faker) {
    return [
        'title' => $faker->text(30)
    ];
});
