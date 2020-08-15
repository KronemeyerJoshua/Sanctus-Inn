<template>
    <article class="media">
        <figure class="media-left">
            <p class="avatar"><slot name="avatar"><img src="public/images/test-news-image.jpg"></slot></p>
            <strong class="username"><slot name="username">John Smith</slot></strong>
            <div class="post-count"><slot name="post-count"></slot></div>
        </figure>
        <div class="media-content is-flex column" ref="media-content">
                <slot name="content" id="post-body" class="post-body"></slot>
                <nav class="level is-flex" v-if="this.$store.state.auth.user">
                    <div class="level-left">
                        <slot name="timestamp"></slot>
                    </div>
                    <div class="level-right">
                        <a class="item" v-if="userId === userid">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="edit" title="Edit" /></span>
                        </a>
                        <a class="item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="smile" title="Agree" />{{agree.length}}</span>
                        </a>
                        <a class="item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="frown" title="Disagree" />{{disagree.length}}</span>
                        </a>
                        <a class="item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="quote-left" title="Quote" @click="this.scrollIntoView" /></span>
                        </a>
                        <a class="item">
                            <span class="icon is-small"><FontAwesomeIcon class="icon" icon="flag" title="Report" /></span>
                        </a>
                    </div>
                </nav>

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
            agree: [Array],
            disagree: [Array],
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
        },
        mounted() {
            // Binds click events for each image in the post
            Array.from(this.$refs['media-content'].getElementsByClassName('image-post')).forEach((e) => {
                e.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.$emit('image-preview', e.src);
                })
            });
        }
    }
</script>

<style scoped>
    .level-left {
        justify-self: flex-start;
        align-self: flex-end;
    }
    .level .level-right {
        align-self: flex-end;
        display: inline-flex;
    }
    .level {
        flex-basis: 100%;
    }
    .media + .media {
        border-top: 1px rgba(150,150,150,0.7) inset;
        margin-top: 0.5rem;
        padding-top: 0.5rem;
    }
    .item {
        margin-right: 0.5rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    p {
        flex-grow: 1;
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
        max-height: 72px;
        height: 72px;
        max-width: 72px;
        width: 72px;
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
        flex-flow: row wrap;
        align-self: stretch;
        padding: 0;
    }
</style>
