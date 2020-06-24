<template>
    <div class="is-vcentered" style="font-size: 14px;">
        <ul style="display: flex; align-items: center; align-content: center; align-items: center;">
            <li v-for="(item,index) in NavData">
            <router-link :to="item.link">{{item.title}}</router-link>
            <FontAwesomeIcon v-if="index !== NavData.length-1" class="icon" icon="chevron-right" style="height: 12px; width: 20px; color: rgba(132,140,142, 0.7); padding-right: 2px; vertical-align: -0.15rem;" />
            </li>
        </ul>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import {
        faChevronRight
    } from "@fortawesome/free-solid-svg-icons";

    library.add(faChevronRight)
    export default {
        name: "NavTree",
        props: {
            NavData: {
                type: Array,
                default: function() {
                    return [{
                        title: "",
                        link: ""
                    }]
                }
            }
        }
    }
</script>

<style scoped>

</style>
