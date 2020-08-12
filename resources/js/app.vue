<template>
    <div class="appContainer">
    <div class="container">
        <Navigation></Navigation>
        <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
    </div>
        <div class="page-footer" style=" display: inline-flex; width: 100%; max-width: 1530px; margin: 0 auto;">
            <div class="page-footer-content">
                <div class="footer-links">
                    <router-link to="">About</router-link>
                    <router-link to="">Contact</router-link>
                </div>
                <p>Copyright &#169; 2020 Sanctus Inn
                <br>
                    Sanctus Inn contains content from Ashes of Creation &#169; Intrepid Studios
                </p>
            </div>
        </div>
    <Login :class="this.$store.state.auth.showLogin ? 'is-active' : ''"></Login>
    <Register :class="this.$store.state.auth.showRegistration ? 'is-active' : ''"></Register>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .footer-links {
        display: inline-flex;
        width: 25%;
        align-items: center;
        justify-content: space-between;
    }
    .page-footer {
        border-top: #46403f outset 4px;
        background: rgba(24,26,25,0.6);
        box-shadow: 0px 0px 2px 2px #0a0a0a;
        margin: 0 auto;
        text-align: center;
        padding: 5px;
    }
    .page-footer-content {
        margin: 0 auto;
    }
</style>
