<template>
    <div class="categoryContainer">
        <section class="forumContainer" v-for="cat in categories" :key="cat.id">
            <div class="forumHeader columns is-mobile">
                <div class="column is-three-fifths">{{cat.title}}</div>
                <div class="column is-one-fifth">Discussions</div>
                <div class="column is-one-fifth">Recent</div>
            </div>
            <div class="categories" v-for="sub in cat.subcategories" :key="sub.id">
                <Category :id="sub.id">
                    <template v-slot:title>{{sub.title}}</template>
                    <template v-slot:desc>{{sub.description}}</template>
                    <template v-slot:discussions>{{sub.threads_count}}</template>
                    <template v-slot:recent><router-link :to="{ name : 'threadPreview', params: {id: sub.id, threadId: sub.latest_thread.id } }">{{sub.latest_thread.title}}</router-link> by
                        <router-link :to="{ name : 'profile', params: {userId: sub.latest_thread.latest_post.user.id } }" v-if="sub.latest_thread.latest_post !== null">{{sub.latest_thread.latest_post.user.name}}</router-link></template>
                </Category>
            </div>
        </section>
    </div>
</template>

<script>
    import Category from "../components/forum/Category";
    import { forum } from '../services/EventService'
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
        created() {
            forum.getCategories()
                .then(({data}) =>
                    this.categories = data)
                .catch((error) => {
                    console.log(error)
                })
        },
    }
</script>

<style scoped>
    .forumContainer {
        padding: 10px;
        color: rgba(215,215,215,0.9);
        background: rgba(73, 47, 19, 0.6);
    }
    .categoryContainer {
        border-radius: 5px;
        border: 1px solid rgba(30,30,30,0.8);
        box-shadow: #0a0a0a 1px 1px 2px 2px;
    }
    .categoryContainer > .category:last-child {
        border: none;
    }
    .categoryTitle {
        color: rgba(0,0,0,0.7) !important;
        font-weight: bold;
    }
    .categories {
        padding-left: 5px;
        border-bottom: 1px solid white;
    }

</style>
