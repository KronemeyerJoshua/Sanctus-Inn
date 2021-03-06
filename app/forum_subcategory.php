<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class forum_subcategory extends Model
{
    public function category() {
        return $this->belongsTo('App\forum_category', 'category_id');
    }

    public function threads() {
        return $this->hasMany('App\forum_threads', 'subcategory_id')->select('id', 'title', 'subcategory_id')->orderBy('updated_at', 'desc');
    }

    public function latestThread() {
        return $this->hasOne('App\forum_threads', 'subcategory_id')->latest('updated_at');
    }
}
