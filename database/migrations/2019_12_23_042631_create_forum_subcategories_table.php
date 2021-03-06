<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumSubcategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forum_subcategories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('category_id')->references('id')->on('forum_categories');
            $table->string('title');
            $table->string('description');
            $table->foreignId('permission_id')->default(1)->references('id')->on('permissions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum_subcategories');
    }
}
