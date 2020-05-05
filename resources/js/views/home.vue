<template>
    <div class="columns is-multiline">
        <div class="column is-two-thirds">
            <div class="columns is-multiline is-centered">
                <BigNewsCard v-for="count in counter" class="column" style="" :key="count"></BigNewsCard>
            </div>
        </div>

        <div class="column is-one-third">
        </div>
    </div>
</template>

<script>
    import BigNewsCard from "../components/BigNewsCard";
    export default {
        components: {
            BigNewsCard
        },
        data() {
            return {
                counter: 3,
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
</style>
