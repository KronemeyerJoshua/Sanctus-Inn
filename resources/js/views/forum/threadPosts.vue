<template>
    <div style="">
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else>
        <div class="forum-title" style="">
            <h1 class="title">{{ this.posts[0].thread.title }}</h1>
        </div>
    <Post v-for="post in posts" :key="post.id">
        <template v-slot:avatar><img :id="'avatar' + post.id" :src="'/storage/images/' + post.user_id + '.jpg'" @error="noImageFound(post.id)"></template>
        <template v-slot:username>{{post.user.name}}</template>
        <template v-slot:timestamp>{{ dateFormat(post.created_at) }}</template>
        <template v-slot:content><p v-html="post.content" style="word-wrap: break-word; color: rgba(215,215,215, 0.8);"></p></template>
    </Post>
        <div v-if="this.$store.state.auth.user !== null">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
            <button class="button is-primary" @click="submitPost">Post That Shizz</button>
        </div>
    </div>
    </div>
</template>

<script>
    import Post from "../../components/forum/Post";
    import { forum } from "../../services/EventService"
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    import "../../../../public/css/editor.css"

    export default {
        name: "threadPosts",
        components: {
            Post
        },
        methods: {
            dateFormat(date) {
            },
            noImageFound(e) {
                document.getElementById('avatar' + e).src = "/storage/images/default.jpg";
            },
            submitPost()
            {
                forum.newPost({thread_id: this.thread_id, user_id: this.$store.state.auth.user.id, content: this.editorData})
                .then(({data}) => {
                    console.log(data.message);
                    if (data.status == '200')
                    {
                        forum.getPosts(this.$route.params.threadId)
                            .then(({data}) =>
                                this.posts = data)
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                })
            }
        },
        data() {
            return {
                posts: {},
                thread: {},
                thread_id: this.$route.params.threadId,
                editor: ClassicEditor,
                isLoading: true,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: { name: 'h1', classes:'title'}, title: 'Heading 1',  class: 'ck-heading_heading1' },
                        ]
                    }
                    // The configuration of the editor.
                }
            }
        },
        created() {
            forum.getPosts(this.$route.params.threadId)
                .then(({data}) => {
                    this.posts = data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
</script>

<style scoped>
    .title {
        border-bottom: #c0a16b 2px solid;
        margin-bottom: 20px;
        padding-bottom: 5px;
        color: rgba(215,215,215, 0.8);
    }
</style>
