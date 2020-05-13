<template>
    <article class="media">
        <figure class="media-left">
            <p class="avatar"><slot name="avatar"><img src="public/images/test-news-image.jpg"></slot></p>
            <strong class="username"><slot name="username">John Smith</slot></strong>
            <slot name="timestamp"></slot>
        </figure>
        <div class="media-content">
            <div class="content">
                <slot name="content" class="postBody"></slot>
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
            post: [String],
            default: "Post could not be loaded"
        },
        data() {
            return {
                postBody: this.post,
            }
        }
    }
</script>

<style scoped>
    .media-content {
        width: 100%;
    }
    .avatar img {
        max-height: 64px;
        height: 64px;
        width: auto;
    }
    .username {
        display: block;
        width: 100%;
    }
    .avatar {
        text-align: center;
        position: relative;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .media .media-left {
        width: 232px;
        max-width: 232px;
        text-align: center;
    }
    .media .media-content {
        max-width: 100% !important;
        width: 50% !important;
    }
</style>
