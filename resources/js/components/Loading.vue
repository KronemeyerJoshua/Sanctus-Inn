<template>
    <div style="height: 0;">
        <h3 class="title loading">Going through the divine gateway to get information</h3>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>
    .title {
        text-align: center;
        padding-top: 10%;
        color: rgba(212,212,212,0.8);
    }

    .loading:after {
        display: inline-block;
        animation: dotty steps(1,end) 1s infinite;
        content: '';
    }

    @keyframes dotty {
        0%   { content: ''; }
        25%  { content: '.'; }
        50%  { content: '..'; }
        75%  { content: '...'; }
        100% { content: ''; }
    }
</style>
