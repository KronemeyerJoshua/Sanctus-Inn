<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Profile;


class ProfileController extends Controller
{
    public function getProfile($userId = null)
    {
        return Profile::where('id', $userId)->first();
    }

    public function updateProfilePic(Request $request)
    {
        $path = $request->file('image')->storeAs('public/images', $request->user()->id . ".jpg");
        return response()->json(['message' => $path]);
    }
}
