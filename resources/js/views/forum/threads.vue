<template>

    <div class="threadContainer">
        <section class="forumContainer">
            <div class="forumHeader columns is-mobile">
                <div class="column is-three-fifths">Title</div>
                <div class="column is-one-fifth">Discussions</div>
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

                        {{ thread.latestpost | checkUserExists }}
                    </template>
                </ThreadPreview>
            </div>
        </section>
    </div>
</template>

<script>
    import ThreadPreview from "../../components/forum/ThreadPreview";
    import { forum } from "../../services/EventService"
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
        filters: {
            checkUserExists: function(value) {
                if (!value) return "No replies";
                return value.user.name + " @ " + value.updated_at;
            }
        }
    }
</script>

<style scoped>
    .threadContainer {
        padding: 5px;
        color: white;
        background: black;
    }
    .categoryContainer {
        border: 1px solid white;
    }
    .categoryContainer > .thread:last-child {
        border: none;
    }
    .thread {
        height: 80px;
        border-bottom: 1px solid white;
    }
</style>
