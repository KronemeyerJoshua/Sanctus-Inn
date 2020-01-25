<template>
    <div class="columns is-multiline">
        <div class="column is-two-thirds">
            <NewsCard v-for="count in counter" style="margin-bottom: 15px;" :key="count"></NewsCard>
        </div>

        <div class="column is-one-third">
            <div style="height: 200px; border: solid 1px white; margin-bottom: 15px;" >
                <div style="border-bottom: solid 1px white; text-align: center;" >
                    <p style="font-weight: bold; color: rgba(255, 255, 255, 0.7);">Live Now</p>
                </div>
                <div>
                    TwitchPlayer
                </div>
            </div>
            <div style="height: 60px; border: solid 1px white;" >
                <div style="border-bottom: solid 1px white; text-align: center;" >
                    <p style="font-weight: bold; color: rgba(255, 255, 255, 0.7);">Guild Node Progression</p>
                </div>
                <div style="padding: 10px;">
                    <progress class="progress" value="15" max="100">15%</progress>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                counter: 3,
            }
        },
        methods: {
        }
    }
</script>
