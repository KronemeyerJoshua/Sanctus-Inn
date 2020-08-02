<template>
    <article class="media">
        <figure class="media-left">
            <p class="avatar"><slot name="avatar"><img src="public/images/test-news-image.jpg"></slot></p>
            <strong class="username"><slot name="username">John Smith</slot></strong>
            <div class="post-count"><slot name="post-count"></slot></div>
            <slot name="timestamp"></slot>
        </figure>
        <div class="media-content" style="align-self: stretch;">
            <div class="content" style="height: 100%;">
                <slot name="content" id="post-body" class="post-body" style="flex-direction: row;"></slot>
                <nav class="level is-mobile" style="justify-content: flex-end; margin-top: -20px;" v-if="this.$store.state.auth.user">
                    <div class="level-right">
                        <a class="level-item" v-if="userId === userid">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="edit" title="Edit" /></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="smile" title="Agree" /></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="frown" title="Disagree" /></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="quote-left" title="Quote" @click="this.scrollIntoView" /></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="flag" title="Report" /></span>
                        </a>
                    </div>
                </nav>
            </div>

        </div>
    </article>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';
    import {faEdit, faFlag, faFrown, faQuoteLeft, faSmile} from "@fortawesome/free-solid-svg-icons";

    library.add(faFlag,
                faEdit,
                faQuoteLeft,
                faSmile,
                faFrown);
    export default {
        name: "Post",
        props: {
            postId: [Number],
            userId: [Number],
            default: "Post could not be loaded"
        },
        computed: {
            userid() {
                try {
                    return this.$store.state.auth.user.id;
                } catch (e)
                {
                }
            }
        },
        data() {
            return {
                postBody: this.post,
            }
        },
        methods: {
            scrollIntoView() {
                let editor = document.querySelector("#content-area");
                let quote = document.querySelector("#post-" + this.postId);
                editor.scrollIntoView();
                console.log(quote.innerHTML);
                this.$emit('quote-clicked', quote.innerHTML);
            }
        }
    }
</script>

<style scoped>
    .media + .media {

        border-top: 1px rgba(150,150,150,0.7) inset;
    }
    .media-bottom-right {

    }
    p {
        height: 100%;
        margin-bottom: 15px;
    }
    .post-count {
        width: 100%;
    }
    .media-content {
        width: 100%;
    }
    .media-left {
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
        border-right: solid 1px rgba(60,60,60,0.7);
        width: 190px;
        max-width: 190px;
        text-align: center;
    }
    .media .media-content {
        max-width: 100% !important;
        width: 50% !important;
    }
</style>
