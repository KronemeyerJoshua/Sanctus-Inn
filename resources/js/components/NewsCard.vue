<template>
    <div class="card">
        <div class="media-content">
            <p class="headline title is-4"><router-link :to="{ name : 'home' }">Evolution Guild Site Live! Evolution Guild Site Live!</router-link></p>
            <p class="content">Sometimes when I code, I make mistakes. Don't tell Alerion, he'll have my ass.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .card a
    {
        color: white;
    }
    .card a:hover
    {
        color: #00b89c;
    }
    .card {
        background: no-repeat rgba(0,0,0,0.7) center url('https://happygamer.com/wp-content/uploads/2019/09/Ashes-of-Creation.jpg'); background-size: auto 250px;
        text-align: center;
        color: white;
        min-width: 250px;
        min-height: 250px;
        max-width: 250px;
        max-height: 250px;
        margin: 10px;
        box-shadow: #0a0a0a 1px 1px 2px 2px;
        border-radius: 5px;
        padding: 0;
        overflow: hidden;
        transition: linear 0.2s;
    }
    .card:hover
    {
        background-size: auto 105% !important;
        box-shadow: #00b89c 1px 1px 8px 2px;
        border: 2px rgba(133,207,170,1) solid;
        border-radius: 5px;
    }
    .headline {
        text-align: center;
        color: rgba(255,255,255,0.9);;
        overflow: hidden;
        line-height: 1em;
        text-shadow: #0a0a0a 2px 2px;
    }
    .media-content
    {
        padding: 5px;
        text-align: center;
        transition: linear 0.2s;
        height: 255px;
        background-color: rgba(0,0,0,0.7);
        position: absolute;
        bottom: -200px;
    }
    .content
    {
        margin-bottom: 0.5rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
    }
    .card:hover .media-content
    {
        background-color: rgba(0,0,0,0.9);
        bottom: -8px;
    }
    .NewsCard {
        border: solid 1px white;
        overflow:hidden;
    }
    .NewsCard:hover {
        border: solid 1px #3490dc;
    }
    .NewsCard:hover .NewsTitle {
        background: rgba(12,3,74,0.7);
    }
    .NewsCard:hover .banner {
        background-size: 105% !important;
    }
    .date {
        float: right;
        padding-right: 5px;
    }
    .banner {
        color: rgba(255,255,255,0.8);
        display: block;
        height: 80px;
        transition: all .5s cubic-bezier(0,0,0,1.15);
    }
    .NewsTitle {
        background: rgba(10,2,59,0.5);
        padding-left: 5px;
        font-weight: bold;
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.7);
    }
</style>
