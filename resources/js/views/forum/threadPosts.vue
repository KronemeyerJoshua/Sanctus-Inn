<template>
    <div>
    <Post v-for="post in posts" :key="post.id">
        <template v-slot:avatar><img src="https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy80MTQyNjY5L29yaWdpbi5qcGciLCJleHBpcmVzX2F0IjoxNTgwNDMzNjcyfQ.na9LHtGFnpQGv-AtAgl9c84BkPaAYICRVmnancQL_qU/img.jpg?width=980"></template>
        <template v-slot:username>{{post.user.name}}</template>
        <template v-slot:timestamp>{{ dateFormat(post.created_at) }}</template>
        <template v-slot:content>{{ post.content }}</template>
    </Post>
        <div>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
            <button class="button is-primary" @click="submitPost">Post That Shizz</button>
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
            submitPost()
            {
                forum.newPost({thread_id: this.thread_id, user_id: 1, content: this.editorData})
                .then(({data}) => {
                    console.log(data.message);
                })
            }
        },
        data() {
            return {
                posts: {},
                thread_id: this.$route.params.threadId,
                user_id: 1,
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }
            }
        },
        created() {
            forum.getPosts(this.$route.params.threadId)
                .then(({data}) =>
                    this.posts = data)
                .catch((error) => {
                    console.log(error)
                })
        }
    }
</script>

<style scoped>
</style>
