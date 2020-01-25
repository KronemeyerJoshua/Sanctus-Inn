<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\forum_subcategory;
use App\forum_threads;

class ForumSubcategoryController extends Controller
{
    public function getSubcategories()
    {
        $subcategories = forum_subcategory::all();
        return $subcategories->toJson();
    }

    public function getThreads(Request $request, $id)
    {
        $subc = forum_subcategory::with(['threads' => function ($query) use (&$id) {
            $query->where('id', $id);
        }])->first();
        return $subc->threads;
    }

}
