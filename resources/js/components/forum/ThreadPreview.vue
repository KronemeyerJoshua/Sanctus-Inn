<template>
    <div class="thread">
        <div class="threadTitle">
            <router-link :to="{ name : 'threadPreview', params: { threadId: this.id } }"><slot name="title"></slot></router-link>
        </div>
        <div class="threadDescription">
            <slot name="desc"></slot>
        </div>
        <div class="meta-info">
            <div class="threadCount">

            </div>
            <div class="commentCount">

            </div>
            <div class="mostRecent">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ThreadPreview",
        props: {
            id: [String, Number]
        }
    }
</script>

<style scoped>

</style>
