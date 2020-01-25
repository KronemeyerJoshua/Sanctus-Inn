<template>
    <div>
<Post v-for="post in posts" :key="post.id">
    <template v-slot:avatar><img src="https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy80MTQyNjY5L29yaWdpbi5qcGciLCJleHBpcmVzX2F0IjoxNTgwNDMzNjcyfQ.na9LHtGFnpQGv-AtAgl9c84BkPaAYICRVmnancQL_qU/img.jpg?width=980"></template>
    <template v-slot:username>{{post.user.name}}</template>
    <template v-slot:timestamp>{{ dateFormat(post.created_at) }}</template>
    <template v-slot:content>{{ post.content }}</template>
</Post>
    </div>
</template>

<script>
    import Post from "../../components/forum/Post";
    import { forum } from "../../services/EventService"
    export default {
        name: "threadPosts",
        components: {
            Post
        },
        methods: {
            dateFormat(date) {
            }
        },
        data() {
            return {
                posts: {}
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
