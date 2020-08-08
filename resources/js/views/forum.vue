<template>
    <div class="categoryContainer">
        <section class="forumContainer" v-for="cat in categories" :key="cat.id">
            <div class="forumHeader columns is-mobile">
                <div class="column is-three-fifths">{{cat.title}}</div>
                <div class="column is-one-fifth has-text-centered">Discussions</div>
                <div class="column is-one-fifth">Recent</div>
            </div>
            <div class="categories" v-for="sub in cat.subcategories" :key="sub.id">
                <Category :id="sub.id">
                    <template v-slot:title>{{sub.title}}</template>
                    <template v-slot:desc>{{sub.description}}</template>
                    <template v-slot:discussions>{{sub.threads_count}}</template>
                    <template v-slot:recent v-if="sub.latest_thread">
                        <router-link :to="{ name : 'threadPreview', params: {id: sub.id, threadId: sub.latest_thread.id } }">{{sub.latest_thread.title}}</router-link> by
                        <router-link :to="{ name : 'profile', params: {userId: sub.latest_thread.latest_post.user.id } }" v-if="sub.latest_thread.latest_post !== null">{{sub.latest_thread.latest_post.user.name}}</router-link>
                    </template>
                    <template v-if="sub.latest_thread" v-slot:date>{{ formatDate(sub.latest_thread.latest_post.updated_at) }}</template>
                </Category>
            </div>
        </section>
    </div>
</template>

<script>
    import Category from "../components/forum/Category";
    import dayjs from 'dayjs';
    import Calendar from 'dayjs/plugin/calendar'
    import { forum } from '../services/EventService'
    import localizedFormat from "dayjs/plugin/localizedFormat";
    export default {
        name: 'forum',
        components: {Category},
        data() {
            return {
                categories: {},
                subcategories: {},
                loading: true,
            }
        },
        computed: {
            subNum() {
                return this.categories.num;
            }
        },
        methods: {
            formatDate(date) {
                dayjs.extend(Calendar);
                return dayjs(date).calendar();
            }
        },
        created() {
            forum.getCategories()
                .then(({data}) =>
                    this.categories = data)
                .catch((error) => {
                    console.log(error)
                })

            document.title = process.env.MIX_APP_NAME + ' Forums' + '- Ashes Community Site'
        },
    }
</script>

<style scoped>
    .forumContainer {
        padding: 10px;
        color: rgba(215,215,215,0.9);
        width: 100%;
        max-width: 100%;
    }
    .categoryContainer {
        padding: 10px;
    }
    .categoryContainer > .category:last-child {
        border: none;
    }
    .categoryTitle {
        color: rgba(0,0,0,0.7) !important;
        font-weight: bold;
    }
    .forumHeader {
        padding: -5px;
        border: 1px solid black;
        background-color: rgba(60,60,60,0.5);
    }
    .categories {
        padding-left: 5px;
        /* border-bottom: 1px solid white; */
    }

</style>
