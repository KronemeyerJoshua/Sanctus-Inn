<template>
    <div class="modal">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <img :src="linkProp">
            <a :href="linkProp" target="_blank">Open Original</a>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="close"></button>
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
    .modal-content img {
        width: auto;
        height: auto;
        max-height: 85vh;
        object-fit: contain;
    }
    .modal-content {
        justify-content: center;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-height: 90vh;
        height: auto;
        width: auto;
        max-width: 90vw;
    }
    .modal-content a {
        flex-basis: 100%;
        text-align: center;
    }
</style>
