<?php


namespace App\Http\Controllers\Live;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TwitchController extends Controller
{
    public function streamerData($gameid = 510699) {
        $json_decode = [];
        $user = "";
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" => "Client-ID: 8byk0sdns7qlyjkijamyowgg47ed8t"
            ]
        ];


        $json_context = stream_context_create($json_options);
        // APOC: 510699
        // HS: 138585
        $json_get = file_get_contents('https://api.twitch.tv/helix/streams?game_id='.$gameid, false, $json_context);
        $json_get = str_replace('{width}', "300", $json_get);
        $json_get = str_replace('{height}', "200", $json_get);
        $json_decode  = json_decode($json_get, true);


        for ($x = 0; $x <= 10; $x++) {
            if ($user != null && !empty($json_decode['data']) && !preg_match('/[^A-Za-z0-9]/', $user)) {
                $user = $json_decode['data'][rand(0, count($json_decode['data']) - 1)]['user_id'];
                $tempuser = file_get_contents('https://api.twitch.tv/helix/users?id='.$user, false, $json_context);
                $tempuser = json_decode($tempuser, true);
                $user = $tempuser['data'][0]['login'];
                break;
            } else {
                $user = 'lolgubstep';
            }
        }
        $json_data = ["req_user" => $user, "twitch" => $json_decode];


        return $json_data;
    }

    public function streamerpanels($user = null) {
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" => "Client-ID: oiea27dzj8y04fvqv1q0sj2l54uxrl"
            ]
        ];

        $json_context = stream_context_create($json_options);

        $link_panels = [];
        $info_panels = [];
        $json_panel = file_get_contents('https://api.twitch.tv/api/channels/'.$user.'/panels', false, $json_context);
        $json_panel = json_decode($json_panel, true);

        foreach ($json_panel as $panel) {
            if (array_key_exists("description", $panel['data'])) {
                array_push($info_panels, $panel);
            }
            elseif (array_key_exists("image", $panel['data'])) {
                array_push($link_panels, $panel);
            }
        }

        $twitch_panels = array("info" => $info_panels, "links" => $link_panels);

        return $twitch_panels;
    }

    public function friendlyName($user = null) {
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" => "Client-ID: 8byk0sdns7qlyjkijamyowgg47ed8t"
            ]
        ];
        $json_context = stream_context_create($json_options);

        $tempuser = file_get_contents('https://api.twitch.tv/helix/users?id='.$user, false, $json_context);
        $tempuser = json_decode($tempuser, true);
        $user = $tempuser['data'][0]['login'];

        return $user;
    }

    public function getTwitchUser($user = null) {
        $json_decode = [];
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" => "Client-ID: 8byk0sdns7qlyjkijamyowgg47ed8t"
            ]
        ];


        $json_context = stream_context_create($json_options);
        // APOC: 510699
        // HS: 138585
        $json_get = file_get_contents('https://api.twitch.tv/helix/streams?user_login='.$user, false, $json_context);
        $json_get = str_replace('{width}', "300", $json_get);
        $json_get = str_replace('{height}', "200", $json_get);
        $json_decode  = json_decode($json_get, true);

        $json_data = ["req_user" => $user, "twitch" => $json_decode];


        return $json_data;
    }

}
