<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\forum_posts;

class ForumPostsController extends Controller
{
    public function getPostsByThreadId(Request $request, $threadId) {
        $posts = forum_posts::where('thread_id', $threadId)->get();
        foreach ($posts as $post)
        {
            $post->user->name;
        }
        return $posts;
    }

    public function getMostRecentBySubcategory(Request $request, $subcategoryId)
    {
    }
}
