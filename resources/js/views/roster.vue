<template>
        <transition name="fade">
            <div v-if="isLoading" key="1">
                <Loading></Loading>
            </div>
            <div v-else key="2">
                <DataTable :data="data_json" :columns="columns" :pageNum="(typeof this.$route.params.pageNumber !== 'undefined') ? Number(this.$route.params.pageNumber) : 1"></DataTable>
            </div>
        </transition>
</template>

<style scoped>

</style>

<script>
    import {roster} from "../services/EventService";
    import DataTable from "../components/DataTable";
    import Loading from "../components/Loading";

    export default {
        name: 'roster',
        components: {Loading, DataTable},
        data() {
            return {
                isLoading: true,
                data_json: [],
                columns: [  {field: 'name', label: 'Name'},
                            {field: 'race', label: 'Race'},
                            {field: 'class', label: 'Class'}]
            }
        },
        async created() {
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
