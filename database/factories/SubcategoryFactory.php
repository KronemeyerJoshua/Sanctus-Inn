<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\forum_subcategory;
use Faker\Generator as Faker;

$factory->define(forum_subcategory::class, function (Faker $faker) {
    return [
        'category_id' => \App\forum_category::all()->random()->id,
        'title' => $faker->text(30),
        'description' => $faker->sentence
    ];
});
