<template>
    <div v-if="loaded" class="profile">
        <div class="title">{{ this.profile.forum_id }}</div>
        <div class="columns">
            <div class="profile-avatar column is-one-fifth">
                <img :src="'/storage/images/' + this.profile.id + '.jpg'">
                <div v-if="this.$store.state.auth.user.id === this.profile.id">
                    <input id="uploader" type="file" accept="image/*" style="margin-bottom: 5px;" @change="uploadImage">
                </div>
            </div>
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
            uploadImage(e) {
                const file = e.target.files[0];
                let reader = new FileReader();
                // Create an image
                reader.onload = (e) => {
                    var img = document.createElement("img");
                    img.onload = () => {
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);

                        var MAX_WIDTH = 128;
                        var MAX_HEIGHT = 128;
                        var width = img.width;
                        var height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        let dataUrl = canvas.toDataURL('image/jpeg');
                        var binary = atob(dataUrl.split(',')[1]);
                        var array = [];
                        for(var i = 0; i < binary.length; i++) {
                            array.push(binary.charCodeAt(i));
                        }

                        let data = new FormData();
                        data.append('id', this.$store.state.auth.user.id);
                        data.append('image', new Blob([new Uint8Array(array)], {type: 'image/jpeg'}));
                        user.updateProfilePicture(data)
                            .then(({data}) => console.log(data.message));

                    }
                    img.src = e.target.result;
                }
                // Load files into file reader
                reader.readAsDataURL(file);

            }
        },
        data() {
            return {
                profile: null,
                loaded: false,
                dataUrl: "aiosjnfoijasoidkjmkasmdkl;",
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
