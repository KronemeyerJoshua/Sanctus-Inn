<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\PostDisagree::class, function (Faker $faker) {
    return [
        'id' => 1,
        'post_id' => 1
    ];
});
