<template>
    <div class="NewsCard">
        <div class="banner"
             :style="'background: url(images/test-news-image.jpg); background-size: 100%; background-position: 50%;'">
            <span class="date">12-19-2019</span>
        </div>

        <div class="NewsTitle">
            <p>Do not trust China, China is Asshoe</p>
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
