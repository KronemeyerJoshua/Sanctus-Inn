<template>
    <div class="category columns is-mobile is-vcentered">
        <div class="column is-three-fifths">
            <div class="categoryTitle">
                <router-link :to="{ name : 'category', params: { id: this.id } }"><slot name="title"></slot></router-link>
            </div>
            <div class="categoryDescription">
                <slot name="desc"></slot>
            </div>
        </div>
        <div class="column is-one-fifth has-text-centered">
            <slot name="discussions"></slot>
        </div>
        <div class="column is-one-fifth">
            <slot name="recent">Awfully quiet in here...</slot>
            <div><slot name="date"></slot></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Category",
        props: {
            id: [String, Number]
        }
    }
</script>

<style scoped>
</style>
