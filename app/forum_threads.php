<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class forum_threads extends Model
{
    public function user() {
        return $this->belongsTo('App\User')->select(array('id', 'name'));
    }

    public function posts() {
        return $this->hasMany('App\forum_posts', 'thread_id');
    }

    public function latestPost() {
        return $this->hasOne('App\forum_posts', 'thread_id')->latest();
    }
}
