<template>
    <div class="modal">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <div class="form">
                <label for="thread-title">Title</label><input id="thread-title" class="thread-title" v-model="title" />
                <p v-if="error===429">It looks like you're doing that too quick. Try again in {{retry}}s</p>
                <p v-if="error===500">Hm... Something went wrong.</p>
            <Wysiwyg @button-clicked="validate"></Wysiwyg>
            </div>
        </div>
    </div>
</template>

<script>
    import Wysiwyg from "./wysiwyg";
    import { forum} from "../../services/EventService";
    export default {
        name: "ThreadModal",
        components: {Wysiwyg},
        data() {
            return {
                title: "",
                retry: 0,
                error: 0,
                errorMessage: ""

            }
        },
        props: {
            subcategory_id: Number
        },
        watch: {
            retry: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            value--;
                            this.retry = value;
                        }, 1000);
                    }
                    else {
                        this.error = false;
                    }
                },
                immediate: true
            }
        },
        methods: {
            close() {
                this.$emit('minimize-thread-modal')
            },
            validate(postData) {
                let err = false;
                if (postData.length < 5) {
                    err = true;
                    console.log("content too short");
                }
                if (this.title.length < 5) {
                    err = true;
                    console.log("title too short");
                }
                if (!err) {
                    this.submit(postData)
                }
            },
            submit(postData) {
                forum.newThread({
                    title: this.title,
                    subcategory_id: this.subcategory_id,
                    content: postData
                })
                .then(() => this.$emit('minimize-thread-modal'))
                .catch((error) => {
                    switch(error.response.status) {
                        case 429:
                            this.error = 429;
                            this.retry = error.response.headers['retry-after'];
                            this.errorMessage = "It looks like you're doing that too quick. Try again in " + this.retry;
                                console.log(error.response);
                            break;
                        default:
                            this.error = 500;
                            console.log(error.response);
                            break;
                    }
                })
            }
        }
    }
</script>t

<style scoped>
    .thread-title {
        width: 100%;
        font-size: 1.4em;
        background-color: var(--light-grey-bg);
        margin-bottom: 10px;
        border: 1px solid rgba(212,212,212,0.7);
        border-radius: 2px;
    }
    input:active, input:focus {
        border: solid 1px rgba(251, 174, 58, 0.7) !important;
        outline: none;
    }
    .modal-content {
        background-color: var(--light-grey-bg);
        padding: 10px;
        border-radius: 5px;
    }
</style>
