<template>
    <div class="columns is-desktop is-vcentered single-thread">
        <div class="column is-three-fifths">
            <div class="categoryTitle">
                <router-link :to="{ name : 'threadPreview', params: { threadId: this.id } }"><slot name="title"></slot></router-link>
            </div>
        </div>
            <div class="commentCount column is-one-fifth has-text-centered">
                <slot name="comments"></slot>
            </div>
            <div class="mostRecent column is-one-fifth">
                <slot name="mostRecent"></slot>
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
    .single-thread {
        height: 90px;

    }
</style>
