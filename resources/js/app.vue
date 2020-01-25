<template>
    <div>
        <Navigation @show-login-modal="showLogin" @show-register-modal="showRegister"></Navigation>
    <div class="container">
        <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <Login :class="isActive ? 'is-active' : ''" @close-login-modal="isActive = false"></Login>
    <Register :class="regIsActive ? 'is-active' : ''" @close-modal="regIsActive = false"></Register>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,
                regIsActive: false
            }
        },
        methods: {
            showLogin() {
                this.isActive = true;
            },
            showRegister() {
                this.regIsActive = true
            }
        }
    }
</script>
