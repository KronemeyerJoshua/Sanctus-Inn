<template>
    <div class="threadContainer">

        <table style="width: 100%;" class="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Replies</th>
                <th>Recent</th>
            </tr>
            </thead>
            <tr v-for="thread in threads">
                <td>
                <ThreadPreview :id="thread.id">
                    <template v-slot:title>
                        {{ thread.title }}
                    </template>
                </ThreadPreview>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import ThreadPreview from "../../components/forum/ThreadPreview";
    import { forum } from "../../services/EventService"
    export default {
        name: "threads",
        components: {ThreadPreview},
        data() {
            return {
                threads: {}
            }
        },
        created() {
            forum.getThreads(this.$route.params.id)
                .then(({data}) =>
                    this.threads = data)
                .catch((error) => {
                    console.log(error)
                })
        }
    }
</script>

<style scoped>

</style>
