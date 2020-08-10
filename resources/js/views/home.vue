<template>

    <div class="columns is-multiline">
        <!-- BEGIN Main News -->
        <div class="column is-two-thirds">
            <div class="columns is-multiline is-centered">
                <BigNewsCard v-for="count in counter" class="column" style="" :key="count"></BigNewsCard>
            </div>
        </div>
        <!-- END Main News -->

        <!-- BEGIN Sidebar -->
        <div class="column is-one-third">

            <!-- BEGIN Recent Forum Posts Widget -->
            <div id="recent-forum" class="recent-forum">
                <h1 class="title">Recent Forum Posts</h1>
                <ul>
                    <li v-for="thread in recentThreads">
                        <router-link :to='"/forum/" + thread.subcategory_id + "/" + thread.id'>{{thread.title}}</router-link>
                    </li>
                </ul>
            </div>
            <!-- END Recent Forum Posts Widget -->

        </div>
        <!-- END Sidebar -->

    </div>
</template>

<script>
    import BigNewsCard from "../components/BigNewsCard";
    import {getRecentThreads} from "../services/EventService";
    export default {
        components: {
            BigNewsCard
        },
        data() {
            return {
                counter: 1,
                recentThreads: {}
            }
        },
        methods: {
        },
        created() {
            // Get Recent Forum Post threads for widget
            getRecentThreads(5)
            .then(({data}) => {
                this.recentThreads = data;
            })
        }
    }
</script>

<style scoped>
    .columns {
        margin-left: 0;
        margin-right: 0;
    }
</style>
