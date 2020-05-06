<template>
    <div class="container">
        <transition name="fade">
            <h1 key="1" v-if="isLoading" style="height: 0" class="text-center">Loading...</h1>
            <div v-else class="" key="2">
                <div class="columns" style="height: 60vh">

                    <iframe class="column is-three-quarters" id="video-stream"  :src="'https://player.twitch.tv/?channel=' + user + '&autoplay=true'" frameborder="0" allowfullscreen="true"
                            @load="streamloaded" v-show="iframeLoaded" scrolling="no" style=""></iframe>

                    <iframe class="column is-one-quarter" id="chat-stream"  :src="'https://twitch.tv/embed/' + user + '/chat'" frameborder="0"  scrolling="no"
                            v-show="iframeLoaded" style=""></iframe>

                </div>

                <div id="profile-container" style="max-width: 100%; max-height: 620px; overflow-y: auto; overflow-x: auto;">
                    <div class="card-columns justify-content-center">
                        <div class="p-2" v-for="panel in twitch_panel.info">
                            <div class="card text-white" >
                                <div v-if="panel.data.title"> <h3>{{panel.data.title}}</h3></div>
                                <a :href="panel.data.link"><img :src="panel.data.image" /></a>
                                <div v-html="panel.html_description">
                                </div>
                            </div>
                        </div>

                        <div class="p-2" v-for="panel in twitch_panel.links">
                            <div class="card">
                                <a :href="panel.data.link"><img :src="panel.data.image" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="columns is-marginless">
                    <!-- Temp Switched to Hearthstone / WoW -->
                    <!-- APOC 510699 | Ashes of Creation 138585 -->
                    <div class="column is-tab" @click="{ loadgame(138585); activetab = 0; }" :class="{'active' : activetab === 0}">HearthStone</div>
                    <div class="column is-tab" @click="{ loadgame(18122); activetab = 1; }" :class="{'active' : activetab === 1}">World of Warcraft</div>
                    <div class="column is-tab" @click="{ loadguild(); activetab = 2; }" :class="{'active' : activetab === 2}">Guild</div>
                </div>
                <div class="columns is-multiline" key="3" style="padding-top: 10px;">
                    <a v-for="user in twitchdata.twitch.data" @click="loadIframe(user.user_id)"  class="column is-one-quarter" style="overflow: hidden;">
                        <div id="live-card" class="card" :style="'background: url(' + user.thumbnail_url + '); height: 200px; width: 300px; max-width: 300px; position: relative; background-size: 100% 100%; background-position: center center; background-repeat: no-repeat;'">
                            <div class="titlebar">{{user.user_name}}</div>
                            <div class="viewers" >Viewers: {{user.viewer_count}}</div>
                        </div>

                    </a>

                </div>
            </div>


        </transition>


    </div>

</template>

<style>
    .titlebar {
        color: rgba(255,255,255,0.7)
    }
    .viewers {
        color: rgba(255,255,255,0.7)
    }
    .is-tab {
        border: 1px solid white;
        text-align: center;
        color: rgba(255,255,255,0.7);
        font-weight: bold;
    }
    .active {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
        background: rgba(0,0,0,0.4);
    }
    .is-tab:hover {
        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
        background: rgba(0,0,0,0.2);
    }
</style>

<script>
    import { live } from "../services/EventService"
    export default {
        name: "live",

        data: function () {
            return {
                twitchdata: { req_user: [], twitch: {data:[]} },
                twitch_panel: {},
                user: "",
                isLoading: true,
                iframeLoaded: false,
                activetab: 0,
            }
        },
        methods: {
            loadIframe: function(user) {
                axios.get('/api/friendly/' + user)
                    .then((resp) => { this.user = resp.data;
                        axios.get('/api/twitchpanels/' + this.user)
                            .then(({data}) => this.twitch_panel = data);
                    })

            },
            streamloaded: function() {
                this.iframeLoaded = true;
            },
            loadgame: function(gameid) {
                live.getStreamsByGameId(gameid)
                    .then(({data}) => { this.twitchdata = data;
                    console.log(data);
                    } );
            },
            loadguild: function() {
            }
        },
        created() {
            live.getStreams()
                .then(({data}) => { this.twitchdata = data; this.user = this.twitchdata.req_user; })
                .finally( () => this.isLoading = false);

        }
    }
</script>
