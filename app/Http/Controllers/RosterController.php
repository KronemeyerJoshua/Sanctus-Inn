<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RosterController extends Controller
{
    public function getRosterData()
    {
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" => "Authorization: Bot NjM2NzkyMjc1NTY1MDE5MTQ3.XbE61A.d6ZwpH7OFdPFbCOtWvdCIXjxMqU"
            ]
        ];
        $json_decode = array();
            $game_races = array("Kaelar", "Vaelune", "Empyrean", "Py'Rai", "Ren'Kai", "Vek", "Dünir", "Niküa", "Tulnar");
            $game_classes = array("Bard", "Cleric", "Fighter", "Mage", "Ranger", "Rogue", "Summoner", "Tank");

            $json_context = stream_context_create($json_options);

            $json_get = file_get_contents('https://discordapp.com/api/guilds/504797119530663964/roles?limit=1000', false, $json_context);

            $roles = array();

            $json_decode = json_decode($json_get, true);

            foreach ($json_decode as $role) {
                $roles += [$role['id'] => $role['name']];
            }

            $json_get = file_get_contents('https://discordapp.com/api/guilds/504797119530663964/members?limit=1000', false, $json_context);

            $json_decode = json_decode($json_get, true);

            $users = array();
            foreach ($json_decode as $member) {
                if (in_array("637060125420552209", $member['roles'])) {
                    $user = array();
                    $user['id'] = $member['user']['id'];
                    if (is_null($member['nick']))
                        $user['name'] = $member['user']['username'];
                    else
                        $user['name'] = $member['nick'];

                    foreach ($member['roles'] as $role) {
                        if (in_array($roles[$role], $game_races))
                            $user['race'] = $roles[$role];

                        foreach ($member['roles'] as $role) {
                            if (in_array($roles[$role], $game_classes)) {
                                {
                                    $user['class'] = $roles[$role];
                                }
                            }

                        }
                    }

                    \DB::table('discord_roster')->updateOrInsert([
                        'id' => $user['id'],
                    ], $user);
                }

            }
            $json_decode = \DB::table('discord_roster')->select(array('name', 'race', 'class'))->get();

        return $json_decode;
    }
}
