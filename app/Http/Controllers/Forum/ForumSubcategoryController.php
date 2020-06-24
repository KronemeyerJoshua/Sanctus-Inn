<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\forum_subcategory;

class ForumSubcategoryController extends Controller
{
    public function getSubcategories()
    {
        $subcategories = forum_subcategory::all();
        return $subcategories->toJson();
    }

    public function getThreads(Request $request, $id)
    {
        $subc = forum_subcategory::where('id', $id)
            ->select('id', 'category_id', 'title')
            ->with("threads.latestpost.user")
            ->first();
        $subc->category;
        foreach ($subc->threads as $thread )
        {
            $thread->loadCount('posts');
        }
        return $subc;
    }

}
