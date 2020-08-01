<?php


namespace App\Http\Controllers\Calc;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Item;
use App\Spell;

class ItemDbController extends Controller
{
    public function getAllSpells() {
        $spells = Spell::get();
        return $spells;
    }

    public function getAllItems() {
        $items = Item::with('spell')->get();
        return $items;
    }

}
