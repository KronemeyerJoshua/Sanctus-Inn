<template>
    <div v-if="loaded" class="profile" :key="$route.fullPath">
        <div class="columns">
            <div class="column is-one-fifth">
                <div class="profile-avatar is-flex">
                    <div class="avatar-container">
                        <img id="avatar" :src="profilePictureUrl" class="avatar" @error="noUserImage">
                        <div class="change-image" v-if="this.$store.state.auth.user.id === this.profile.id">
                            <label for="uploader" class="change-image-text">
                                <a>Change</a>
                            </label>
                            <input id="uploader" type="file" accept="image/*" style="margin-bottom: 5px;" @change="uploadImage">
                        </div>
                    </div>
                    <div class="title" style="flex: 1 0 100%">{{ this.profile.forum_id }}</div>
                </div>
            </div>
            <div class="profile-bio column is-three-fifths">

                <div class="bioPreview" v-if="bioEditMode === false">
                    <div class="bioEditButton" v-if="this.$store.state.auth.user.id === this.profile.id" @click="editBio"><a>Edit</a></div>
                    {{ this.profile.bio }}
                </div>

                <div class="bioEdit" v-if="bioEditMode === true">
                    <textarea v-model="bioTextArea" class="textarea" placeholder="Tell us about yourself">{{ this.profile.bio }}</textarea>
                    <button class="is-small is-dark" @click="updateBio">Save</button>
                </div>
            </div>
            <div class="profile-char column is-one-fifth">
                <ul>
                    <li>Character Name: {{ this.profile.character }}</li>
                    <li>Race: {{ this.profile.race }}</li>
                    <li>Class: {{ this.profile.class }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .bioEditButton {
        position: absolute;
        top: 0;
        right: 0;
    }
    .profile-bio {
        position: relative;
    }
    .profile
    {
        color: white;
    }
    .profile-avatar {
        text-align: center;
        position: relative;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }
    .change-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        opacity: 0;
        transition: linear 0.2s;
    }
    .avatar {
        border: 1px solid black;
        max-width: 100%;
        max-height: 100%;
    }
    .avatar-container {
        height: 128px;
        width: 128px;
        overflow: hidden;

    }
    .avatar-container:hover .change-image
    {
        opacity: 1;
    }
    .change-image-text a {
        text-shadow: #0a0a0a 0 0 10px;
        color: white;
    }
    #uploader {
        display: none;
    }
</style>

<script>
    import {user} from "../../services/EventService"

    import "../../../../public/css/editor.css"

    export default {
        name: "profile",
        components: {
        },
        data() {
            return {
                profile: null,
                loaded: false,
                dataUrl: null,
                profilePictureUrl: null,
                isOwnProfile: false,
                bioEditMode: false,
                bioTextArea: "",
            }
        },
        methods: {
            updateBio() {
                this.bioEditMode = false;
                this.profile.bio = this.bioTextArea;
            },
            editBio() {
                this.bioEditMode = true
            },
            noUserImage() {
                this.profilePictureUrl = '/storage/images/default.jpg'
            },
            uploadImage(e) {
                // Get the selected image
                const file = e.target.files[0];
                let reader = new FileReader();

                reader.onload = (e) => {
                    // Need image onload to wait for completion
                    let img = new Image();

                    // Allows us to access vue properties in inner function
                    let parent = this;

                    img.onload = () => {
                        // Create canvas and load it with our image
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);

                        // Define new image properties
                        let MAX_WIDTH = 128;
                        let MAX_HEIGHT = 128;
                        let width = img.width;
                        let height = img.height;

                        // Maintain aspect ratio
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

                        // Resize our image in canvas
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        // Convert to blob
                        let dataUrl = canvas.toDataURL('image/jpeg');
                        let binary = atob(dataUrl.split(',')[1]);
                        let array = [];
                        for( let i = 0; i < binary.length; i++ ) {
                            array.push(binary.charCodeAt(i));
                        }

                        // Send post request
                        // TODO: Error Checking for unsuccessful upload
                        let data = new FormData();
                        data.append('image', new Blob([new Uint8Array(array)], {type: 'image/jpeg'}));
                        user.updateProfilePicture(data)
                            .then(({data}) => { parent.profilePictureUrl = '/storage/images/' + parent.$store.state.auth.user.id + '.jpg' + '?updated=' + Date.now();
                                          document.getElementById('uploader').value = "";
                            })

                    };
                    img.src = e.target.result;
                };

                // Load file into file reader
                reader.readAsDataURL(file)
            }
        },
        watch: {
            $route(to, from) {
                user.getProfile(this.$route.params.userId)
                    .then(({data}) => {
                        this.profile = data;
                        this.profilePictureUrl = '/storage/images/' + this.profile.id + '.jpg';
                        this.isOwnProfile = (this.profile.id === this.$store.state.auth.user.id);
                    })
                    .catch((error) =>
                        console.log(error))
                    .finally( () =>
                        this.loaded = true)
            }
        },
        created() {
            user.getProfile(this.$route.params.userId)
                .then(({data}) => {
                    this.profile = data;
                    this.profilePictureUrl = '/storage/images/' + this.profile.id + '.jpg';
                    this.isOwnProfile = (this.profile.id === this.$store.state.auth.user.id);
                    this.bioTextArea = this.profile.bio;
                })
                .catch((error) =>
                        console.log(error))
                .finally( () =>
                        this.loaded = true)
        }
    }
</script>

