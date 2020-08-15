<template>
    <div class="modal">
        <div class="modal-background" @click="close()"></div>
        <div class="modal-content">
            <img :src="linkProp">
        </div>

    </div>
</template>

<script>
    export default {
        name: "ImagePreview",
        props: {
            linkProp: {
                type: [String],
                default: ''
            },
        },
        methods: {
            close() {
                this.$emit('close-preview-window');
            }
        }
    }
</script>

<style scoped>
    .modal-content {
        height: auto;
        max-width: 80vh;
    }
</style>
