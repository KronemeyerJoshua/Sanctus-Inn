<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostDisagree extends Model
{
    // Disable Timestamps
    public $timestamps = false;

    public function user() {
        return $this->hasOne('App\User', 'id')->select('name');
    }

    public function post() {
        return $this->belongsTo('App\PostDisagree', 'post_id');
    }
}
