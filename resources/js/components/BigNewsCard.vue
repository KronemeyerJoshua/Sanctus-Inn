<template>
    <div class="card">
            <p class="headline title is-4 is-flex"><router-link :to="{ name : 'home' }">Welcome to Sanctus Inn</router-link></p>
            <p class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        <div class="bottom-card is-flex" style="justify-content: space-between">
            <p><router-link to="/forum/1">Announcements</router-link> by <router-link to="/profile/1">Gubstep</router-link></p>
            <p style="">3/7/2019 2:23:13</p>
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
    .bottom-card p a {
        color: #4482e5;
    }
    .card a
    {
        color: rgba(240,240,240,0.9);
    }
    .card a:hover
    {
        text-shadow: #bd8647 0px 0px 6px;
    }
    .card {
        background: transparent;
        text-align: center;
        color: rgba(255,255,255,0.8);
        min-height: 250px;
        max-height: 250px;
        min-width: 100%;
        max-width: 100%;
        margin: 10px;
        border: 1px inset rgba(221, 221, 221, 0.1);
        padding: 0;
        overflow: hidden;
        transition: linear 0.2s;
        font-family: "Roboto",sans-serif;
    }
    .card:hover
    {
        background-color: rgba(212,212,212,.05);
        /* box-shadow: #bd8647 1px 1px 8px 2px; */
    }
    .headline a
    {
        color: rgba(240,240,240,0.9);
        text-shadow: 1px 1px 1px #000;
    }
    .headline {
        text-align: center;
        position: relative;
        padding: 5px;
        background: no-repeat linear-gradient( rgba(10, 0, 0, 0.2), rgba(10, 0, 0, 0.2) ), url('https://happygamer.com/wp-content/uploads/2019/09/Ashes-of-Creation.jpg');
        background-size: cover;
        background-position: center;
        height: 60px;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-bottom: 0;
        font-family: 'EB Garamond', serif;
    }
    .content
    {
        padding: 10px 10px 0px 10px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        margin-bottom: 0.5rem;
    }
    .bottom-card
    {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
