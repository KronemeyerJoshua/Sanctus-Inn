<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function spell() {
        return $this->hasOne(Spell::class, "id", "spellid");
    }
}
