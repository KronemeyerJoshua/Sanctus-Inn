<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class forum_posts extends Model
{

    public function user() {
        return $this->belongsTo('App\User', 'user_id')->select(array('id', 'name', 'avatar'));
    }

    public function thread() {
        return $this->belongsTo('App\forum_threads', 'thread_id')->select(array('id', 'subcategory_id', 'title'));
    }

    public function agree() {
        return $this->hasMany('App\PostAgree', 'post_id')->select('id');
    }

    public function disagree() {
        return $this->hasMany('App\PostDisagree', 'post_id')->select('id');
    }
}
