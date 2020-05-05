<template>
    <div v-if="loaded" class="profile">
        <div class="title">{{ this.profile.forum_id }}</div>
        <div class="columns">
            <div class="profile-avatar column is-one-fifth"></div>
            <div class="profile-bio column is-three-fifths"> {{ this.profile.bio }}</div>
            <div class="profile-char column is-one-fifth">
                <ul>
                    <li>Character Name: {{ this.profile.character }}</li>
                    <li>Race: {{ this.profile.race }}</li>
                    <li>Class: {{ this.profile.class }}</li>
                </ul>
            </div>
        </div>

        {{ this.profile }}
    </div>
</template>

<script>
    import {user} from "../../services/EventService"

    import "../../../../public/css/editor.css"

    export default {
        name: "profile",
        components: {
        },
        methods: {
        },
        data() {
            return {
                profile: null,
                loaded: false
            }
        },
        created() {
            user.getProfile(this.$route.params.userId)
                .then(({data}) =>
                    this.profile = data)
                .catch((error) =>
                        console.log(error))
                .finally( () =>
                        this.loaded = true)
        }
    }
</script>

<style scoped>
    .profile
    {
        color: white;
    }
</style>
