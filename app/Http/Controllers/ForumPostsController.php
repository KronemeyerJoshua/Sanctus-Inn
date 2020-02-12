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

    public function newPost(Request $request)
    {
        $post = new forum_posts;

        $post->thread_id = $request->thread_id;
        $post->user_id = $request->user_id; // TODO: Primitive, Authenticate User via JWT before posting
        $post->content = $request->content;

        $post->save();

        return response()->json(['message' => 'Successfully posted']); // TODO: Check valid SQL response before returning successful json message
    }
}
