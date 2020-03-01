<template>
    <div>
    <Post v-for="post in posts" :key="post.id">
        <template v-slot:avatar><img src="https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy80MTQyNjY5L29yaWdpbi5qcGciLCJleHBpcmVzX2F0IjoxNTgwNDMzNjcyfQ.na9LHtGFnpQGv-AtAgl9c84BkPaAYICRVmnancQL_qU/img.jpg?width=980"></template>
        <template v-slot:username>{{post.user.name}}</template>
        <template v-slot:timestamp>{{ dateFormat(post.created_at) }}</template>
        <template v-slot:content><p v-html="post.content"></p></template>
    </Post>
        <div v-if="this.$store.state.auth.user !== null">
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
                thread_id: this.$route.params.threadId,
                editor: ClassicEditor,
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
