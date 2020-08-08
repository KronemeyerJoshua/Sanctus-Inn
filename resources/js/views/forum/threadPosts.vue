<template>
    <div class="postsContainer">
        <div v-if="isLoading">
            Loading...
        </div>
        <div v-else>
            <!-- Forum Navigation Tree -->
            <div>
                <NavTree :nav-data="NavData"></NavTree>
            </div>

            <!-- Begin Thread -->
            <div class="forum-title" style="">
                <h1 class="title">{{ this.posts[0].thread.title }}</h1>
            </div>

            <!-- Begin Posts -->
            <Post v-for="post in posts" :key="post.id" :user-id='post.user.id' :post-id="post.id" @quote-clicked="quoteInsert(post.content, post.user)">
                <template v-slot:avatar><img :id="'avatar' + post.id" :src="'/public/images/' + post.user_id + '.jpg'" @error="noImageFound(post.id)"></template>
                <template v-slot:username><router-link :to="'/profile/' + post.user.id">{{post.user.name}}</router-link></template>
                <template v-slot:timestamp>{{ formatDate(post.created_at) }}</template>
                <template v-slot:post-count>Tales Told: {{post.user.posts_count}}</template>
                <template v-slot:content><p :id="'post-'+post.id" v-html="post.content" style="word-wrap: break-word; color: rgba(215,215,215, 0.8);"></p></template>
            </Post>
            <!-- End Posts -->
            <!-- End Thread -->

            <!-- Begin Pagination -->
            <nav v-if="pages > 1" class="pagination is-small is-centered" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                    <li ><a class="pagination-link" aria-label="Goto page 1" :class="{}" @click="goToPage(1)">1</a></li>
                    <li v-if="currentPage-1 > 1"><a class="pagination-link" :aria-label="'Goto page'" @click="goToPage(currentPage-1)">{{currentPage-1}}</a></li>
                    <li v-if="currentPage !== 1 && currentPage !== pages"><a class="pagination-link is-current"  :aria-label="'Page'" aria-current="page">{{currentPage}}</a></li>
                    <li v-if="currentPage+1 < pages"><a class="pagination-link" :aria-label="'Goto page'" @click="goToPage(currentPage+1)">{{currentPage+1}}</a></li>
                    <li v-if="pages > 1"><a class="pagination-link" :class="{}" :aria-label="'Goto page'" @click="goToPage(pages)">{{pages}}</a></li>
                </ul>
            </nav>
            <!-- End Pagination -->

            <div v-if="this.$store.state.auth.user !== null">
                <wysiwyg ref="wysiwyg" id="wysiwyg" class="wysiwyg" @button-clicked="submitPost"></wysiwyg>
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
                thread_id: this.$route.params.threadId,
                isLoading: true,
                NavData: []
            }
        },
        methods: {
            /**
             * Inserts quote into WYSIWYG Editor
             * @param data The post content
             * @param user The user of the post
             */
            quoteInsert(data, user) {
                console.log(data);
                this.$refs.wysiwyg.insert("[quote=\"" + user.name + ";" + user.id + "\"]" + data + "[/quote]");
            },
            /**
             * Loads the posts of the specified page number
             * Specifically used in the nav at the bottom of this page
             * @param pageNum The page number for the posts we are retrieving
             */
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
            /**
             * If the user doesn't have an image set or
             * that image cannot be found
             * @param id The users id to track the img of the avatar
             */
            noImageFound(id) {
                document.getElementById('avatar' + id).src = "/storage/images/default.jpg";
            },
            /**
             * Attempts to submit a new post to the db
             * @param postData The post content
             */
            submitPost(postData)
            {
                forum.newPost({thread_id: this.thread_id, user_id: this.$store.state.auth.user.id, content: postData})
                .then(({data}) => {
                    if (data.status == '200')
                    {
                        // Determine if we need to create a new page
                        if (this.posts[0]['threadPostCount'] % 10 === 0) {
                            this.pages++;
                        }
                        forum.getPosts(this.$route.params.threadId, this.pages)
                            .then(({data}) => {
                                this.posts = data;
                                this.currentPage = this.pages;
                                this.$router.replace({name: this.$route.name, params: {page: this.currentPage.toString()}})
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                })
            },
            /**
             * Formats the date to a readable format
             * @param date Epoch time
             * @returns {string} Friendly date
             */
            formatDate(date) {
                dayjs.extend(localizedFormat);
                return dayjs(date).format('lll')
            }
        },
        created() {
            // Check to see if a page is specified in uri
            if (this.$route.params.page) {
                this.currentPage = Number(this.$route.params.page);
            }

            // Get our posts from the db for this page
            forum.getPosts(this.$route.params.threadId, this.currentPage)
                .then(({data}) => {
                    this.posts = data;

                    // Provide data for navigation tree at the top of the page
                    this.NavData = [
                        {title: this.posts[0].thread.subcategory.category.title, link: '/forum'},
                        {title: this.posts[0].thread.subcategory.title, link: '/forum/' + this.posts[0].thread.subcategory.id}
                    ];

                    // Determine the amount of pages this thread has
                    this.pages = Math.ceil(this.posts[0]['threadPostCount'] / this.pagination);

                    // Data has loaded
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
</script>

<style scoped>
    .avatar img {
        min-height: 80px;
        max-height: 80px;
    }
    .avatar {
        margin-bottom: 0;
    }
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
    .wysiwyg {
        margin-top: 2%;
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
