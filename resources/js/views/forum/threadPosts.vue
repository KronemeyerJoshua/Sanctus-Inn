<template>
    <div class="postsContainer">
    <div v-if="isLoading">
        Loading...
    </div>
    <div v-else>
        <div>
            <NavTree :nav-data="NavData"></NavTree>
        </div>
        <div class="forum-title" style="">
            <h1 class="title">{{ this.posts[0].thread.title }}</h1>
        </div>
    <Post v-for="post in posts" :key="post.id">
        <template v-slot:avatar><img :id="'avatar' + post.id" :src="'/storage/images/' + post.user_id + '.jpg'" @error="noImageFound(post.id)"></template>
        <template v-slot:username><router-link :to="'/profile/' + post.user.id">{{post.user.name}}</router-link></template>
        <template v-slot:timestamp>{{ formatDate(post.created_at) }}</template>
        <template v-slot:post-count>Tales Told: {{post.user.posts_count}}</template>
        <template v-slot:content><p v-html="post.content" style="word-wrap: break-word; color: rgba(215,215,215, 0.8);"></p></template>
    </Post>
        <nav v-if="pages > 1" class="pagination is-small is-centered" role="navigation" aria-label="pagination">
            <ul class="pagination-list">
                <li ><a class="pagination-link" aria-label="Goto page 1" :class="{}" @click="goToPage(1)">1</a></li>
                <li v-if="currentPage-1 > 1"><a class="pagination-link" :aria-label="'Goto page'" @click="goToPage(currentPage-1)">{{currentPage-1}}</a></li>
                <li v-if="currentPage !== 1 && currentPage !== pages"><a class="pagination-link is-current"  :aria-label="'Page'" aria-current="page">{{currentPage}}</a></li>
                <li v-if="currentPage+1 < pages"><a class="pagination-link" :aria-label="'Goto page'" @click="goToPage(currentPage+1)">{{currentPage+1}}</a></li>
                <li v-if="pages > 1"><a class="pagination-link" :class="{}" :aria-label="'Goto page'" @click="goToPage(pages)">{{pages}}</a></li>
            </ul>
        </nav>
        <div v-if="this.$store.state.auth.user !== null">
            <wysiwyg @button-clicked="submitPost"></wysiwyg>
        </div>
    </div>
    </div>
</template>

<script>
    import Post from "../../components/forum/Post";
    import { forum } from "../../services/EventService"
    import dayjs from 'dayjs'
    import localizedFormat from 'dayjs/plugin/localizedFormat';

    import Wysiwyg from "../../components/forum/wysiwyg";
    import NavTree from "../../../../app/Http/Controllers/Forum/NavTree";

    export default {
        name: "threadPosts",
        components: {
            NavTree,
            Wysiwyg,
            Post
        },
        data() {
            return {
                currentPage: 1,
                pagination: 10,
                pages: 0,
                posts: {},
                thread: {},
                max_posts: 0,
                thread_id: this.$route.params.threadId,
                isLoading: true,
                NavData: []
            }
        },
        methods: {
            goToPage(pageNum) {

                if (pageNum !== this.currentPage) {
                    this.currentPage = Number(pageNum);
                    this.$router.replace({name: this.$route.name, params: {page: this.currentPage.toString()}})
                    forum.getPosts(this.$route.params.threadId, this.currentPage)
                        .then(({data}) => {
                            this.posts = data;
                            this.isLoading = false;
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            },
            noImageFound(e) {
                document.getElementById('avatar' + e).src = "/storage/images/default.jpg";
            },
            submitPost(postData)
            {
                forum.newPost({thread_id: this.thread_id, user_id: this.$store.state.auth.user.id, content: postData})
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
            },
            formatDate(date) {
                dayjs.extend(localizedFormat);
                return dayjs(date).format('lll')
            }
        },
        created() {
            if (this.$route.params.page) {
                this.currentPage = Number(this.$route.params.page);
            }
            forum.getPosts(this.$route.params.threadId, this.currentPage)
                .then(({data}) => {
                    this.posts = data;
                    this.max_posts = this.posts[0]['threadPostCount'];
                    this.NavData = [
                        {title: this.posts[0].thread.subcategory.category.title, link: '/forum'},
                        {title: this.posts[0].thread.subcategory.title, link: '/forum/' + this.posts[0].thread.subcategory.id}
                    ];
                    this.pages = Math.ceil(this.max_posts / this.pagination);
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
        border-bottom: #c0a16b 2px inset;
        margin-bottom: 20px;
        padding-bottom: 5px;
        color: rgba(215,215,215, 0.8);
    }
    .postsContainer {
        padding: 10px;
    }
    .pagination {
        margin: 0;
    }
    li {
        color: rgba(240,240,240,0.9);
    }
    .pagination-previous, .pagination-next, .pagination-link {
        color: rgba(240,240,240,0.9);
    }
    .pagination-previous:hover, .pagination-next:hover, .pagination-link:hover {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
    .pagination-link.is-current {
        background: transparent;
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
</style>
