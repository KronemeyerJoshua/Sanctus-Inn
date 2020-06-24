<template>
    <div class="modal">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <div class="form">
            <input id="title" class="title" v-model="title" />
            <Wysiwyg @button-clicked="submit"></Wysiwyg>
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
                title: ""
            }
        },
        props: {
            subcategory_id: Number
        },
        methods: {
            close() {
                this.$emit('minimize-thread-modal')
            },
            submit(postData) {
                forum.newThread({
                    title: this.title,
                    subcategory_id: this.subcategory_id,
                    content: postData
                })
                .then(() => this.$emit('minimize-thread-modal'))
            }
        }
    }
</script>

<style scoped>
    .modal-content {
    }
</style>
