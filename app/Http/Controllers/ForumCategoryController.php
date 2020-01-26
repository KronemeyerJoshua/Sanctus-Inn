<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\forum_category;

class ForumCategoryController extends Controller
{
    public function getCategories() {
        $forumCategories = forum_category::all();

        foreach ($forumCategories as $fc)
        {
            foreach($fc->subcategories as $sub)
            {
                $sub->loadCount('threads');
                $sub->threads_count;
                $sub->latestThread->user;
            }
        }
        return $forumCategories;
    }
}
