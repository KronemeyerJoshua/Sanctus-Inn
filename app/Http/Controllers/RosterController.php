<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class RosterController extends Controller
{
    public function getRosterData()
    {
        $game_races = array("Kaelar", "Vaelune", "Empyrean", "Py'Rai", "Ren'Kai", "Vek", "Dünir", "Niküa", "Tulnar");
        $game_classes = array("Bard", "Cleric", "Fighter", "Mage", "Ranger", "Rogue", "Summoner", "Tank");

        $json_decode = Http::withOptions([
            "verify" => false])
            ->withHeaders(["Authorization" => "Bot NjM2NzkyMjc1NTY1MDE5MTQ3.XbExBQ.s1O93EyVxfBPAA8FaWkarOR8c6Q"])
            ->get("https://discordapp.com/api/guilds/504797119530663964/roles?limit=1000")
            ->json();

            $roles = array();
            foreach ($json_decode as $role) {
                $roles += [$role['id'] => $role['name']];
            }

            $json_decode = Http::withOptions([
                "verify" => false])
                ->withHeaders(["Authorization" => "Bot NjM2NzkyMjc1NTY1MDE5MTQ3.XbExBQ.s1O93EyVxfBPAA8FaWkarOR8c6Q"])
                ->get("https://discordapp.com/api/guilds/504797119530663964/members?limit=1000")
                ->json();

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
