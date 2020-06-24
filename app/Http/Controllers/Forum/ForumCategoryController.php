<?php

namespace App\Http\Controllers\Forum;

use App\forum_posts;
use App\Http\Controllers\Controller;
use App\forum_category;

class ForumCategoryController extends Controller
{
    public function getCategories() {
        $forumCategories = forum_category::with(['subcategories:id,category_id,title,description', 'subcategories.latestThread:id,subcategory_id,title', 'subcategories.latestThread.latestPost.user'])
            ->select('id', 'title')
            ->get();
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
