<template>
        <transition name="fade">
            <div v-if="isLoading" class="text-center" key="1" style="height: 0;">
                <h3>Please wait a moment while our GM fetches our records...</h3>
            </div>
            <div v-else key="2">
                <DataTable :data="data_json" :columns="columns" :pageNum="(typeof this.$route.params.pageNumber !== 'undefined') ? Number(this.$route.params.pageNumber) : 1"></DataTable>
            </div>
        </transition>
</template>

<script>
    import {roster} from "../services/EventService";
    import DataTable from "../components/DataTable";

    export default {
        name: 'roster',
        components: {DataTable},
        data() {
            return {
                isLoading: true,
                data_json: [],
                columns: [  {field: 'name', label: 'Name'},
                            {field: 'race', label: 'Race'},
                            {field: 'class', label: 'Class'}]
            }
        },
        computed: {

        },
        async created() {
            console.log(this.$route.matched.some(({ name }) => name === 'pageNumber'));
            roster.getRosterData()
                .then(({data}) => {
                    this.data_json = data;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally( () => {
                    this.isLoading = false;
                });
        },
    }
</script>
