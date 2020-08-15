<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\forum_posts;
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

    public function getRecentThreads($amount) {
        return forum_threads::latest('updated_at')->take(5)->get();
    }

    public function create(Request $request)
    {
        $user = auth()->user();

        // TODO: Check valid SQL Response
        $thread = new forum_threads;
        $thread->subcategory_id = $request->subcategory_id;
        $thread->title = $request->title;
        $thread->user_id = $user['id'];
        $thread->save();

        $post = new forum_posts;
        $post->thread_id = $thread->id;
        $post->user_id = $user['id'];
        $post->content = $request->content;
        $post->save();

        return response()->json(['status' => '200', 'message' => 'Successfully posted']);
    }
}
