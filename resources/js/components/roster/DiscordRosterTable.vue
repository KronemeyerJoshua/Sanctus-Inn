<template>
<div class="container">
    <transition name="fade">
    <div v-if="isLoading" class="text-center" key="1" style="height: 0;">
        <h3>Please wait a moment while our GM fetches our records...</h3>
    </div>
    <div v-else key="2">
        <table class="table is-hoverable is-fullwidth">
            <thead>
            <tr>
                <th>Name</th>
                <th>Race</th>
                <th>Class</th>
            </tr>
            </thead>
            <tr v-for="member in roster_json">
                <td>{{member.name}}</td>
                <td>{{member.race}}</td>
                <td>{{member.class}}</td>
            </tr>
        </table>
    </div>
    </transition>
</div>
</template>

<style>
    .table {
        font-family: 'EB Garamond', serif;
        background: rgba(0,0,0,0.7);
        color: rgba(240,240,240,0.9);
    }
    tr:hover {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
</style>

<script>

import {roster} from "../../services/EventService";

export default {
        name: "Roster",
        data() {
            return {
                roster_json: [],
                columns: [{field: 'name', label: 'Name', sortable: true},
                          {field: 'race', label: 'Race', sortable: true},
                          {field: 'class', label: 'Class', sortable: true}],
                options: {
                    search: true,
                    showColumns: true
                },
                isLoading: true,
                isPaginated: true,
                isPaginationSimple: false,
                paginationPosition: 'bottom',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 5,
            }
        },

        methods: {
        },

        async created() {
            roster.getRosterData()
                .then(({data}) => {
                    this.roster_json = data;
                    console.log(data);
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
