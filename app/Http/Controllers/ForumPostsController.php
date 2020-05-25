<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\forum_posts;

class ForumPostsController extends Controller
{
    public function getPostsByThreadId(Request $request, $threadId) {
        $posts = forum_posts::where('thread_id', $threadId)->get();
        $posts[0]->thread;
        foreach ($posts as $post)
        {
            $post->user->name;
            $post->user->loadCount('posts');
        }
        return $posts;
    }

    public function getMostRecentBySubcategory(Request $request, $subcategoryId)
    {
    }

    public function newPost(Request $request)
    {
        $user = auth()->user();

        if ($user) {
            $post = new forum_posts;
            $post->thread_id = $request->thread_id;
            $post->user_id = $user['id'];
            $post->content = $request->content;

            $post->save();
            $post->thread()->touch();

            return response()->json(['status' => '200', 'message' => 'Successfully posted']); // TODO: Check valid SQL response before returning successful json message
        }
        else
        {
            return response()->json(['message' => 'Uh oh.. Something went wrong..']);
        }
    }
}
