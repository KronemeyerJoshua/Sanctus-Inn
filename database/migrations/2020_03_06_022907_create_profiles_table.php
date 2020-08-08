<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->bigInteger('id');
            $table->string('forum_id');
            $table->string('discord_id')->nullable(true);
            $table->string('twitch_id')->nullable(true);
            $table->string('youtube_id')->nullable(true);
            $table->text('bio')->nullable(true);
            $table->text('character')->nullable(true);
            $table->text('race')->nullable(true);
            $table->text('class')->nullable(true);
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
        Schema::dropIfExists('profiles');
    }
}
