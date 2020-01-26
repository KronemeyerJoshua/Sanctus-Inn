<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class forum_posts extends Model
{

    public function user() {
        return $this->belongsTo('App\User', 'user_id')->select(array('id', 'name'));
    }

    public function thread() {
        return $this->belongsTo('App\forum_threads', 'thread_id');
    }
}
