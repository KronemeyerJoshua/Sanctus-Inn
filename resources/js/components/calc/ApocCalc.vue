<template>
    <div id="apoc-calc" class="container">
        <div class="columns">
            <div class="column is-horizontal">
                <h6 class="title is-4">Buffs</h6>
                <div class="parent columns is-multiline" style="height: 80px;">
                    <div v-for="buff in activebuffs" class="child" style="height: 79px; width: 79px;" :data-tippy-content="buff.description">
                        <img :src="buff.img" class="p-2" style="height: 79px; width: 79px;"/>
                        <p style="text-shadow: 2px 2px #000000; font-size: 13; font-weight: bold; position: relative; top: -33px;">{{buff.count}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="" class="columns">

            <div class="column is-two-fifths">
                <h3 class="title is-4">Armor</h3>
                <div class="parent columns is-multiline" style="overflow-y: auto;">
                    <div v-for="item in armor" class="child card" style="width: 100px;" :data-tippy-content="'<img src=' + item.tooltip + '>'" :key="item.id">
                        <img :src="item.img" class="border border-gold" style="height: 79px; width: 79px;" draggable="true" v-on:dragstart="drag(item)" />

                        <p style="font-size: 13; font-weight: bold;">{{item.name}}</p>
                    </div>
                </div>
            </div>

            <div class="column is-two-fifths border border-gold" >
                <h3 class="title is-4">Weapons</h3>
                <div class="parent columns is-multiline" style="overflow-y: auto;">
                    <div v-for="item in weapons" class="card child" style="width: 100px;" :data-tippy-content="'<img src=' + item.tooltip + '>'" :key="item.id">
                        <img :src="item.img" class="border border-gold" style="height: 79px; width: 79px;" draggable="true" v-on:dragstart="drag(item)" />
                        <p style="font-size: 13; font-weight: bold;">{{item.name}}</p>
                    </div>
                </div>
            </div>

            <div class="column is-one-fifth border border-gold">
                <h3 class="title is-4">Consumables</h3>
                <div class="parent columns is-multiline" style="overflow-y: auto;">
                    <div v-for="item in consumables" style="width: 100px;" class="card child" :data-tippy-content="'<img src=' + item.tooltip + '>'" :key="item.id">
                        <img id="body" :src="item.img" class="border border-gold" draggable="true" style="height: 79px; width: 79px;" v-on:dragstart="drag(item)" />
                        <p style="font-size: 13; font-weight: bold;">{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns has-text-centered">
            <div class="column is-two-thirds">
                <h3 class="title is-4">Action Bar</h3>
                <div class="columns is-centered">
                    <div class="card child" :id="item.id + index" style="width: 100px;" v-for="(item, index) in actionbar" v-on:drop="drop(item, $event, index)" :item="item.slot" @dragover.prevent  @contextmenu.prevent="removeItem(actionbar, index, $event)" :data-tippy-content="item.img ? '<img src=' + item.tooltip + '>' : 'empty'">

                        <img :src="item.img ? item.img : actionbarimg" draggable="true" v-on:dragstart="drag" class="border" style="height: 79px; width: 79px;"/>
                        <p style="font-size: 13; font-weight: bold;">{{item.name}}</p>

                    </div>
                </div>
            </div>


            <div class="column is-one-third has-text-centered">
                <h3 class="title is-4">Inventory</h3>
                <div class="columns is-centered">
                    <div :id="item.id" class="card child" style="width: 100px;" v-for="(item, index) in inventory" v-on:drop="drop(item, $event)" :item="item.slot" @dragover.prevent :data-tippy-content="item.img ? '<img src=' + item.tooltip + '>' : 'empty'">


                        <img :src="item.img ? item.img : actionbarimg" draggable="true" v-on:dragstart="drag" class="border border-gold" style="height: 79px; width: 79px;" @contextmenu.prevent="removeItem(inventory, index, $event)" />
                        <p style="font-size: 13; font-weight: bold;">{{item.name}}</p>

                    </div>
                </div>
            </div>
        </div>

    </div>





</template>
<style>

    #apoc-calc .card {
        background: transparent !important;
    }

    #apoc-calc .card {
        font-family: 'EB Garamond', serif;
        color: rgba(255,255,255,0.8);
    }

    .title {
        font-family: 'EB Garamond', serif;
        color: rgba(255,255,255,0.8);
    }
</style>

<script>
    import tippy, {followCursor, delegate} from 'tippy.js';
    import {gameDb} from "../../services/EventService";
    import 'tippy.js/dist/tippy.css';
    import anyBase from 'any-base';

    export default {
        name: "apoc-calc",

        data: function() {
            return {
                tippyinst: [],
                spelldrag: [],
                armor_id: [
                    "chest",
                    "legs"
                ],
                weapon_id: [
                    "greatsword",
                    "bow",
                    "staff",
                    "1h mace",
                    "wand",
                    "2h mace",
                    "longbow",
                    "crossbow",
                    "scepter",
                    "tome",
                    "potion launcher",
                    "halbred",
                    "1h sword",
                    "2h axe",
                    "spear",
                    "2h sword"
                ],
                consumable_id: [
                    "potion"
                ],
                slots: [
                    "any",
                    "any",
                    "any",
                    "any",
                    "any",
                    "chest",
                    "legs"
                ],
                inventory: [
                    {name: "chest", slot: "chest", img: "", id: "", dslot: "chest"},
                    {name: "legs", slot: "legs", img: "", id: "", dslot: "legs"}
                ],
                actionbar: [
                    {name: "any", slot: "any", img: "", id: "", dslot: "any", spell: []},
                    {name: "any", slot: "any", img: "", id: "", dslot: "any", spell: []},
                    {name: "any", slot: "any", img: "", id: "", dslot: "any", spell: []},
                    {name: "any", slot: "any", img: "", id: "", dslot: "any", spell: []},
                    {name: "any", slot: "any", img: "", id: "", dslot: "any", spell: []},
                ],
                activebuffs: [],
                items: [],
                spells: [],
                actionbarimg: "../images/apoccalc/actionbar_slot.png",
                beingdragged: "",
            }
        },
        computed: {
            armor() {
                var result = [];
                this.items.forEach(item => {
                    if (this.armor_id.includes(item.slot)){
                        result.push(item);
                    }
                });
                return result;
            },
            weapons() {
                var result = [];
                this.items.forEach(item => {
                    if (this.weapon_id.includes(item.slot)){
                        result.push(item);
                    }
                });
                return result;
            },
            consumables() {
                var result = [];
                this.items.forEach(item => {
                    if (this.consumable_id.includes(item.slot)){
                        result.push(item);
                    }
                });
                return result;
            }
        },
        methods: {
            removeItem: function(src, index, e) {
                let doc = e.path[1];
                console.log(doc);
                if (!doc._tippy){
                    tippy(doc, {
                        followCursor: true,
                        plugins: [followCursor]
                    });
                }
                let buff = this.activebuffs.find(x => x.id === src[index].spellid);
                if (buff.count <= 1) {
                    let i = this.activebuffs.findIndex(x => x.id === src[index].spellid);
                    this.activebuffs.splice(i, 1);
                }
                else {
                    buff.count--;
                }

                doc._tippy.setContent("empty");
                src[index].slot = this.slots[index];
                src[index].img = "";
                src[index].id = "";
                src[index].spellid = "";
                src[index].name = src[index].dslot;

                this.buildquery();
            },
            drag: function(src) {
                this.beingdragged = src;
                if (src.spell.id) {
                    this.spelldrag = this.spells.find(z => z.id === src.spellid);
                    let preimg = new Image();
                    preimg.src = this.spelldrag.img;
                }
            },
            encode: function(s) {
                let encodeString = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
                let shortId = anyBase(anyBase.DEC, encodeString);
                return shortId(s);
            },
            buildquery: function() {
                let s = [];
                let item, inv;
                this.actionbar.forEach(function(item) {
                    s.push(item.id);
                });
                item = s.join("9");
                s = [];
                this.inventory.forEach(function(item) {
                    s.push(item.id);
                });
                inv = s.join("9");
                item = this.encode(item + "8" + inv);
                window.history.replaceState(null, null, "/apoc-calc/"+item);
                let a = this.decode(item);
            },

            decode: function(s) {
                let encodeString = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
                let shortId = anyBase(encodeString, anyBase.DEC);
                return shortId(s);
            },
            drop (src, ele, index) {
                if (src.slot == this.beingdragged.slot || src.slot == "any") {
                    if (src.spellid) {
                        let i = this.activebuffs.findIndex(x => x.id === src.spellid);
                        this.activebuffs[i].count--;
                        if (this.activebuffs[i].count <= 1) {
                            this.activebuffs.splice(i, 1);
                        }
                    }

                    src.img = this.beingdragged.img;
                    src.id = this.beingdragged.id;
                    src.name = this.beingdragged.name;
                    src.spellid = this.beingdragged.spellid;
                    src.tooltip = this.beingdragged.tooltip;
                    src.spell = this.beingdragged.spell;

                    if (this.beingdragged.spellid) {
                        if (this.activebuffs.includes(src.spell)) {
                            let buff = this.activebuffs.find(x => x.id === src.spellid);
                            buff.count = buff.count + 1;
                        }
                        else {
                            src.spell.count = 1;
                            this.activebuffs.push(src.spell);
                        }

                    }

                    let doc = ele.path[1];
                    console.log(doc);
                    if (!doc._tippy){
                        tippy(doc, {
                            allowHTML: true,
                            followCursor: true,
                            plugins: [followCursor]
                        });
                    }

                    doc._tippy.setContent("<img src=" + this.beingdragged.tooltip + " />");
                    this.buildquery();
                } else {
                    alert("Can't put " + this.beingdragged.slot + " into " + src.slot);
                }
            },
            populate: function() {
                console.log("Premade detected");
                let s = this.decode(this.$route.params.premade);
                let b = s.split("8");
                let f = b[1].split("9");
                let a = b[0].toString().split("9");
                for (let i = 0; i < this.actionbar.length; i++) {
                    let item = this.items.find(x => x.id === parseInt(a[i]));
                    if (item) {
                        this.actionbar[i].img = item.img;
                        this.actionbar[i].id = item.id;
                        this.actionbar[i].name = item.name;
                        this.actionbar[i].spellid = item.spellid;
                        this.actionbar[i].tooltip = item.tooltip;
                        this.actionbar[i].spell = item.spell;
                        let buff = this.activebuffs.find(x => x.id === item.spellid);
                        if (item.spell.id && !buff) {
                            item.spell.count = 1;
                            this.activebuffs.push(item.spell);
                        } else {
                            buff.count = buff.count + 1;
                        }

                        let doc = document.getElementById("30");
                        console.log(doc)
                    }
                }

                for (let i = 0; i < this.inventory.length; i++) {

                    let item = this.items.find(x => x.id === parseInt(f[i]));
                    if (item) {

                        this.inventory[i].img = item.img;
                        this.inventory[i].id = item.id;
                        this.inventory[i].slot = item.slot;
                        this.inventory[i].name = item.name;
                        this.inventory[i].spellid = item.spellid;
                        this.inventory[i].tooltip = item.tooltip;
                        let buff = this.activebuffs.find(x => x.id === item.spellid);
                        if (item.spell.id && !buff) {
                            item.spell.count = 1;
                            this.activebuffs.push(item.spell);
                        }
                        else
                        {
                            buff.count = buff.count + 1;
                        }
                    }
                }
            }
        },
        created() {

            gameDb.getAllItems()
                .then(({data}) =>
                    this.items = data)
                .catch((error) => {
                    console.log(error)
                })
            .finally( () => {
                if (this.$route.params.premade) {
                    this.populate();
                }
            });

            gameDb.getAllSpells()
                .then(({data}) =>
                    this.spells = data)
                .catch((error) => {
                    console.log(error)
                });

        },
        mounted() {
            this.tippyinst = delegate('.parent', {
                target: '.child',
                content: 'Content not found',
                followCursor: true,
                allowHTML: true,
                plugins: [followCursor],
            });
        },
        beforeRouteLeave (to, from, next) {
            this.tippyinst.forEach(t => {
                t.destroy();
            });
            next();
        }
    }
</script>
