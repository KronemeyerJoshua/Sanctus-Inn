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
                <th @click="sortListString('name')">Name</th>
                <th @click="sortListString('race')">Race</th>
                <th @click="sortListString('class')">Class</th>
            </tr>
            </thead>
            <tr v-for="member in this.roster_json.slice(( (this.currentPage-1) * pageSize), pageSize * currentPage)">
                <td>{{member.name}}</td>
                <td>{{member.race}}</td>
                <td>{{member.class}}</td>
            </tr>
        </table>
        <p>
            <button @click="decrementPage" :disabled="this.currentPage === 1">Previous</button>
            <button @click="incrementPage">Next</button>
        </p>
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
    .table > tr:hover {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
    .table thead th {
        color: rgba(255,255,255,0.7);
    }
    .table thead th:hover {
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
                isLoading: true,
                sortProps: {name: 'name', dir: 'asc', inverse: 1},
                pageSize: 15,
                currentPage: 1
            }
        },

        methods: {
            incrementPage() {
                this.currentPage++;
            },
            decrementPage() {
                this.currentPage--;
            },
            sortListString(columnName) {
                if (this.sortProps.name != columnName) {
                    this.sortProps.name = columnName;
                    this.sortProps.dir = 'asc';
                    this.sortProps.inverse = 1;
                } else {
                    if (this.sortProps.dir == 'asc') {
                        this.sortProps.dir = 'desc';
                        this.sortProps.inverse = -1;
                    } else {
                        this.sortProps.dir = 'asc';
                        this.sortProps.inverse = 1;
                    }
                }

                const sortP = this.sortProps;
                this.roster_json.sort(
                function(a,b) {
                    a = a[columnName];
                    b = b[columnName];
                    if (a < b || b === null) {
                        return -1 * sortP.inverse;
                    } else if (a > b || a === null) {
                        return 1 * sortP.inverse;
                    } else {
                        return 0;
                    }
                });
            }
        },

        async created() {
            roster.getRosterData()
                .then(({data}) => {
                    this.roster_json = data;
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
