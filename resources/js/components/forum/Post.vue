<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64"><slot name="avatar"><img src="public/images/test-news-image.jpg"></slot></p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong><slot name="username">John Smith</slot></strong> <small><slot name="timestamp">20m</slot></small>
                    <br>
                    <slot name="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</slot>
                </p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                    </a>
                    <a class="level-item">
                        <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                </div>
            </nav>
        </div>
        <div class="media-right">
            <button class="delete"></button>
        </div>
    </article>
</template>

<script>
    export default {
        name: "Post",
        props: {
            id: [Number, String]
        }
    }
</script>

<style scoped>

</style>
