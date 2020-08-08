<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Profile;
use Faker\Generator as Faker;

$factory->define(Profile::class, function (Faker $faker) {
    $game_races = array("Kaelar", "Vaelune", "Empyrean", "Py'Rai", "Ren'Kai", "Vek", "Dünir", "Niküa", "Tulnar");
    $game_classes = array("Bard", "Cleric", "Fighter", "Mage", "Ranger", "Rogue", "Summoner", "Tank");
    return [
        'id' => 1,
        'forum_id' => 'username',
        'discord_id' => $faker->userName . "#" . rand(1000,9999),
        'twitch_id' => $faker->userName,
        'youtube_id' => $faker->userName,
        'bio' => $faker->paragraph,
        'character' => $faker->userName,
        'race' => $game_races[rand(0,count($game_races)-1)],
        'class' => $game_classes[rand(0, count($game_classes)-1)]
    ];
});
