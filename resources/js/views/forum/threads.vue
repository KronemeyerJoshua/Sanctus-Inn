<template>

    <div class="threadContainer">
        <div v-if="loading"></div>
        <section class="forumContainer" v-if="!loading">
            <div id="forumHeaderButtons" style="display: flex; flex-direction: row; justify-content: space-between; padding-bottom: 1rem; align-items: center;">
                <div style="">
                    <router-link to="/forum">{{subcategory.category.title}} </router-link>
                    ->
                    <router-link :to="'/forum/' + subcategory.id">{{subcategory.title}}</router-link>
                </div>
                <button id="btnNewThread" class="button is-dark" @click="newThread = !newThread">
                    New Thread
                </button>
            </div>
            <div class="forumHeader columns is-mobile">
                <div class="column is-three-fifths">Title</div>
                <div class="column is-one-fifth has-text-centered">Discussions</div>
                <div class="column is-one-fifth">Recent</div>
            </div>
            <div class="thread" v-for="thread in threads" :key="thread.id">
                <ThreadPreview :id="thread.id">
                    <template v-slot:title>
                        {{ thread.title }}
                    </template>
                    <template v-slot:comments>
                        {{ thread.posts_count }}
                    </template>
                    <template v-slot:mostRecent>
                        <div v-if="userExists">
                            <router-link :to="'/profile/' + thread.latestpost.user.id">{{thread.latestpost.user.name}}</router-link>
                            <div>{{ formatDate(thread.latestpost.updated_at)}}</div>
                        </div>
                        <div v-else>
                            No replies
                        </div>
                    </template>
                </ThreadPreview>
            </div>
        </section>
        <ThreadModal :class="newThread ? 'is-active' : ''" @minimize-thread-modal="newThread = false" :subcategory_id="subcategory.category_id"></ThreadModal>
    </div>
</template>

<script>
    import ThreadPreview from "../../components/forum/ThreadPreview";
    import { forum } from "../../services/EventService"
    import dayjs from 'dayjs'
    import localizedFormat from "dayjs/plugin/localizedFormat";
    import Loading from "../../components/Loading";
    import ThreadModal from "../../components/forum/ThreadModal";
    export default {
        name: "threads",
        components: {ThreadModal, Loading, ThreadPreview},
        data() {
            return {
                threads: {},
                subcategory: {},
                loading: true,
                newThread: false
            }
        },
        created() {
            forum.getThreads(this.$route.params.id)
                .then(({data}) => {
                    this.threads = data.threads;
                    this.subcategory = data;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        computed: {
            userExists(value) {
                return value;
            }
        },
        methods: {
            formatDate(date) {
                dayjs.extend(localizedFormat);
                return dayjs(date).format('llll')
            }
        }
    }
</script>

<style scoped>
    .threadContainer {
        padding: 10px;
        color: rgba(215,215,215,0.9);
        width: 100%;
        max-width: 100%;
    }
    .categoryContainer {
        border: 1px solid white;
    }
    .thread {
        border-bottom: 1px solid white;
    }
    .forumContainer > .thread:last-child {
        border: none;
    }
    .forumHeader {
        border: 1px solid black;
    }
    .columns {
        margin: 0;
    }
</style>
