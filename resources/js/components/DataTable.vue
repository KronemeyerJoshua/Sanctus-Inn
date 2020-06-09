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


                <nav class="pagination is-small is-centered" role="navigation" aria-label="pagination">
                    <a class="pagination-previous" @click="decrementPage">Previous</a>
                    <a class="pagination-next" @click="incrementPage">Next page</a>
                    <ul class="pagination-list">
                        <li><a class="pagination-link" aria-label="Goto page 1" :class="{'is-current': isStartPage}" @click="goToPage(1)">1</a></li>
                        <li v-if="currentPage-1 > 1"><a class="pagination-link" :aria-label="'Goto page' + currentPage-1" @click="decrementPage">{{currentPage-1}}</a></li>
                        <li v-if="currentPage !== 1 && currentPage !== maxPages"><a class="pagination-link is-current"  :aria-label="'Page' + currentPage" aria-current="page">{{currentPage}}</a></li>
                        <li v-if="currentPage+1 < maxPages"><a class="pagination-link" :aria-label="'Goto page' + currentPage+1" @click="incrementPage">{{currentPage+1}}</a></li>
                        <li v-if="maxPages > 1"><a class="pagination-link" :class="{'is-current': isEndPage}" :aria-label="'Goto page' + maxPages" @click="goToPage(maxPages)">{{maxPages}}</a></li>
                    </ul>
                </nav>

                <!--<p class="has-text-centered">
                    <button @click="decrementPage" :disabled="this.currentPage === 1">Previous</button>
                    <button @click="incrementPage">Next</button>
                </p> -->
            </div>
</template>

<style>
    .table {
        font-family: 'EB Garamond', serif;
        background: transparent;
        color: rgba(220, 220, 220, 0.9);
    }
    td {
        border-color: rgba(0,0,0,0.9) !important;
    }
    .table > tr:hover {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
    .table thead th {
        color: rgba(255,255,255,0.7);
        border-color: rgba(0,0,0,0.9) !important;
    }
    .table thead th:hover {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
    .table-container {
        margin: 5px;

    }
    .pagination {
        margin: 0;
    }
    .pagination-previous, .pagination-next, .pagination-link {
        color: rgba(240,240,240,0.9);
    }
    .pagination-previous:hover, .pagination-next:hover, .pagination-link:hover {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
    .pagination-link.is-current {
        background: transparent;
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
</style>

<script>
    export default {
        name: "DataTable",
        data() {
            return {
                sortProps: {name: 'name', dir: 'asc', inverse: 1},
                currentPage: this.pageNum,
                maxPages: Math.ceil(this.data.length / this.pageSize)
            }
        },

        props: {
            pageNum: {
                type: Number,
                default: 1
            },
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
        computed: {
            isStartPage() {
                return this.currentPage === 1;
            },
            isEndPage() {
                return this.currentPage === this.maxPages;
            }
        },
        methods: {
            goToPage(page) {
                if (page !== this.currentPage) {
                    this.currentPage = Number(page);
                    this.$router.replace({name: this.$route.name, params: {pageNumber: this.currentPage.toString()}})
                }
            },
            incrementPage() {
                if (this.currentPage < this.maxPages) {
                    this.currentPage++;
                    this.$router.replace({name: this.$route.name, params: {pageNumber: this.currentPage.toString()}})
                }
            },
            decrementPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.$router.replace({name: this.$route.name, params: {pageNumber: this.currentPage.toString()}});
                }
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
        },
        async mounted() {
            // Param input exceeds maxPages, default to last page
            if (this.currentPage > this.maxPages) {
                this.currentPage = this.maxPages;
                await this.$router.replace({name: this.$route.name, params: {pageNumber: this.currentPage.toString()}})
            }

            // Param input is negative, please don't do that, default back to page 1
            if (this.currentPage < 1) {
                this.currentPage = 1;
                await this.$router.replace({name: this.$route.name, params: {pageNumber: this.currentPage.toString()}})
            }
        }
    }
</script>
