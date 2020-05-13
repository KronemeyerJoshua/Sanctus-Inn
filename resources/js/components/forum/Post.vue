<template>
    <article class="media">
        <figure class="media-left">
            <p class="avatar"><slot name="avatar"><img src="public/images/test-news-image.jpg"></slot></p>
            <strong><slot name="username" class="username">John Smith</slot></strong>
            <slot name="replyTime"></slot>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <br>
                    <slot name="content" class="postBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</slot>
                </p>
                <p>
                    <small><slot name="timestamp">20m</slot></small>
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

        </div>
    </article>
</template>

<script>
    export default {
        name: "Post",
        props: {
            id: [Number, String],
        }
    }
</script>

<style scoped>
    .media-content {
        width: 80%;
    }
    .avatar img {
        max-height: 64px;
        height: 64px;
        width: auto;
    }
    .avatar {
        text-align: center;
        position: relative;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .media-left {
        width: 232px;
        max-width: 232px;
    }
    .media {
        text-align: center !important;
    }
</style>
