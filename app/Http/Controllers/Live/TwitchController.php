<?php


namespace App\Http\Controllers\Live;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TwitchController extends Controller
{
    private $clientId = "";
    private $clientSecret = "";

    /**
     * Generic helper function for HTTP Requests -> JSON
     * @param String $url uri we are getting the JSON from
     * @return mixed JSON Response from
     */
    protected function getJsonPost($url) {
        $json_options = [
            "http" => [
                "method" => "POST"
            ]
        ];
        $json_context = stream_context_create($json_options);
        $response = file_get_contents($url, false, $json_context);
        return json_decode($response);
    }

    /**
     * Retrieves the AuthToken from Twitch API
     * Needed for Twitch.tv API Calls
     * @return mixed The access token
     */
    private function getAuthToken() {
        $url = "https://id.twitch.tv/oauth2/token";
        $tokenInfo = collect($this->getJsonPost($url . '?client_id='. $this->clientId .'&client_secret='. $this->clientSecret .'&grant_type=client_credentials'));
        return $tokenInfo['access_token'];
    }


    /**
     *
     * @param int $gameid Twitch Game ID
     * @return array A random "featured" streamer and other streamers
     */
    public function streamerData($gameid = 138585) {
        $user = "";
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" =>  "Client-ID: ". $this->clientId ."\r\n" .
                             "Authorization: Bearer ". $this->getAuthToken() ."\r\n"
            ]
        ];

        $json_context = stream_context_create($json_options);
        // APOC: 510699
        // HS: 138585

        // Get our streamers
        $json_get = file_get_contents('https://api.twitch.tv/helix/streams?game_id='.$gameid, false, $json_context);

        // Resize their stream previews
        $json_get = str_replace('{width}', "300", $json_get);
        $json_get = str_replace('{height}', "200", $json_get);
        $json_decode  = json_decode($json_get, true);


        // Gets a random "featured" user
        if (!empty($json_decode['data'])) {
            $user = $json_decode['data'][rand(0, count($json_decode['data']) - 1)]['user_id'];
            $tempuser = file_get_contents('https://api.twitch.tv/helix/users?id='.$user, false, $json_context);
            $tempuser = json_decode($tempuser, true);
            $user = $tempuser['data'][0]['login'];
        } else {
            $user = 'lolgubstep';
        }

        $json_data = ["req_user" => $user, "twitch" => $json_decode];


        return $json_data;
    }

    /**
     * We don't use korean/chinese characters
     * So this uses their login name instead, which is english
     * @param null $user
     * @return String Friendly login name
     */
    public function friendlyName($user = null) {
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" =>  "Client-ID: ". $this->clientId ."\r\n" .
                    "Authorization: Bearer ". $this->getAuthToken() ."\r\n"
            ]
        ];
        $json_context = stream_context_create($json_options);

        $tempuser = file_get_contents('https://api.twitch.tv/helix/users?id='.$user, false, $json_context);
        $tempuser = json_decode($tempuser, true);
        $user = $tempuser['data'][0]['login'];

        return $user;
    }

    /**
     * DEPRECATED
     * Gets the specified twitch user
     * @param String $user
     * @return array User information
     */
    public function getTwitchUser($user = null) {
        $json_decode = [];
        $json_options = [
            "http" => [
                "method" => "GET",
                "header" =>  "Client-ID: ". $this->clientId ."\r\n" .
                    "Authorization: Bearer ". $this->getAuthToken() ."\r\n"
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
