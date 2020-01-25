<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\forum_threads;

class ForumThreadsController extends Controller
{
    public function getThreadsByCategory(Request $request, $subcategoryId) {
        return forum_threads::where('subcategory_id', $subcategoryId)->get()->toJson();
    }

    public function getNumberThreadsByCategory(Request $request, $subcategoryId)
    {
        return forum_threads::where('subcategory_id', $subcategoryId)->count();
    }
}
