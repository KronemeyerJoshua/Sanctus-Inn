<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\forum_category;

class ForumCategoryController extends Controller
{
    public function getCategories() {
        $forumCategories = forum_category::with(['subcategories', 'subcategories.latestThread', 'subcategories.latestThread.latestPost:id,thread_id,updated_at,user_id', 'subcategories.latestThread.latestPost.user'])->get();


        foreach ($forumCategories as $fc)
        {
            foreach($fc->subcategories as $sub)
            {
                $sub->loadCount('threads');
            }
        }

        return $forumCategories;
    }
}
