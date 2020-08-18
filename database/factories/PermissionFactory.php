<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\permissions;
use Faker\Generator as Faker;

$factory->define(permissions::class, function (Faker $faker) {
    return [
        'id' => 1,
        'role' => 'user'
    ];
});
