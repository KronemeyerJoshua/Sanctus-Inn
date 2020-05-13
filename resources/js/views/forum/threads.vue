<template>

    <div class="threadContainer">
        <section class="forumContainer">
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
    </div>
</template>

<script>
    import ThreadPreview from "../../components/forum/ThreadPreview";
    import { forum } from "../../services/EventService"
    import moment from 'moment'
    export default {
        name: "threads",
        components: {ThreadPreview},
        data() {
            return {
                threads: {}
            }
        },
        created() {
            forum.getThreads(this.$route.params.id)
                .then(({data}) =>
                    this.threads = data)
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
                return moment(date).format('llll')
            }
        }
    }
</script>

<style scoped>
    .threadContainer {
        padding: 10px;
        color: rgba(215,215,215,0.9);
        background: rgba(73, 47, 19, 0.6);
        box-shadow: #0a0a0a 1px 1px 2px 2px;
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
        margin-bottom: 0;
    }
</style>
