<template>
            <div class="table-container">
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th v-for="column in columns" @click="sortListString(column.field)">{{ column.label }}</th>
                    </tr>
                    </thead>
                    <tr v-for="member in this.data.slice(( (this.currentPage-1) * pageSize), pageSize * currentPage)">
                        <td v-for="column in columns">{{member[column.field]}}</td>
                    </tr>
                </table>
                <p class="has-text-centered">
                    <button @click="decrementPage" :disabled="this.currentPage === 1">Previous</button>
                    <button @click="incrementPage">Next</button>
                </p>
            </div>
</template>

<style>
    .table {
        font-family: 'EB Garamond', serif;
        background: transparent;
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
    .table-container {
        border-radius: 3px;
        margin: 5px;
        background: rgba(0,0,0,0.7);
    }
</style>

<script>
    export default {
        name: "DataTable",
        data() {
            return {
                sortProps: {name: 'name', dir: 'asc', inverse: 1},
                currentPage: 1
            }
        },

        props: {
            columns: {
                type: Array,
                default: function() {
                    return [{field: 'name', label: 'Name'}]
                }
            },
            pageSize: {
                type: Number,
                default: 15
            },
            data: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        },
        methods: {
            incrementPage() {
                this.currentPage++;
                window.history.pushState(this.currentPage, null, this.$route.path + "/" + this.currentPage);
            },
            decrementPage() {
                this.currentPage--;
                window.history.pushState(this.currentPage, null, this.$route.path + "/" + this.currentPage);
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
                this.data.sort(
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
        }
    }
</script>
