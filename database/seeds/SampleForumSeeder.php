<?php

use Illuminate\Database\Seeder;

class SampleForumSeeder extends Seeder
{
    use \Illuminate\Foundation\Testing\RefreshDatabase;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();
        factory(\App\permissions::class, 1)->create([
            'id' => 1,
            'role' => 'user'
        ]);
        factory(\App\User::class, 30)->create()
        ->each(function ($user) {
            $user->profile()->saveMany(factory(\App\Profile::class, 1)->create([
                'id' => $user->id,
                'forum_id' => $user->name,
                'discord_id' => $user->name . '#' . rand(1000,9999),
                'twitch_id' => $user->name . rand(100,1000),
                'youtube_id' => $user->name . rand(999,9999)
            ]));
        });

        factory(\App\forum_category::class, 5)->create()
            ->each(function($cat) {
                $cat->subcategories()->saveMany(factory(\App\forum_subcategory::class, rand(1,3))->create()
                ->each(function($subcat) {
                    $subcat->threads()->saveMany(factory(\App\forum_threads::class, rand(0,10))->create()
                    ->each(function($thread) {
                        $thread->posts()->saveMany(factory(\App\forum_posts::class, rand(5,20))->create())
                        ->each(function($post) {
                            $post->agree()->saveMany(factory(\App\PostAgree::class, rand(0,50))->create([
                                'id' => \App\User::all()->random()->id,
                                'post_id' => $post->id
                            ]));
                            $post->disagree()->saveMany(factory(\App\PostDisagree::class, rand(0,50))->create([
                                'id' => \App\User::all()->random()->id,
                                'post_id' => $post->id
                            ]));
                        });
                    }));
                }));
            });
        DB::commit();
    }
}
