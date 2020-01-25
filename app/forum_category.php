<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class forum_category extends Model
{
    public function subcategories() {
        return $this->hasMany('App\forum_subcategory', 'category_id');
    }
}
