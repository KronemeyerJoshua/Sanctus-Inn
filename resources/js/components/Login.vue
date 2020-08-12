<template>
    <div class="modal">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">

            <div class="loginForm" v-on:keydown.enter="login">
                <div class="modal-title">Welcome back!</div>
                <div id="error-box" class="error-box">
                    <label id="error-message" class="error-message">{{error}}</label>
                </div>
                <div class="field">
                    <label class="label">
                        Username
                    </label>
                    <div class="control">
                        <input class="input" id="login-username" type="text" placeholder="ExampleUsername" v-model="username">
                    </div>
                </div>

                <div class="field">
                    <label class="label">
                        Password
                    </label>
                    <div class="control">
                        <input class="input" id="login-password" type="password" v-model="password">
                    </div>
                </div>

                <div class="has-text-centered">
                        <button class="button" @click="login">Login</button>
                        <button class="button">Reset Password</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import apiClient from '../services/EventService'
    import * as bulmaToast from "bulma-toast";
    export default {
        data() {
            return {
                username: '',
                password: '',
                error: '',
            }
        },
        methods: {
            close() {
                this.$store.state.auth.showLogin = false;
            },
            login() {
                if (!this.verifyInputs())
                    return;

                apiClient.login({
                    name: this.username,
                    password: this.password
                }).then( (response) =>  {
                    this.$store.dispatch('auth/saveToken', response.data)
                    this.$store.dispatch('auth/setUser', response.data)
                    bulmaToast.toast({
                        message: "Login successful!",
                        type: "is-success",
                        position: "top-center"
                    })
                    this.$router.go()
                }).catch((error) => {
                    this.error = 'Invalid Credentials';
                    console.log(error)
                })
            },
            verifyInputs() {
                if (!this.username) {
                    this.error = 'Username cannot be blank';
                    document.getElementById('login-username').classList.add('error-box-anim');
                    return false;
                }

                if (!this.password) {
                    this.error = 'Password cannot be blank';
                    document.getElementById('login-password').classList.add('error-box-anim');
                    return false;
                }

                return true;
            }
        }
    }
</script>

<style scoped>
    .modal-title {
        text-align: center;
        font-weight: bold;
        line-height: 2rem;
    }
    .loginForm {
        padding: 20px;
        color: rgba(255,255,255,0.8);
        overflow: hidden;
    }
    .label {
        color: rgba(255,255,255,0.8) !important;
    }
    .modal-content {
        background: rgba(77,77,77,0.5);
        border: 1px inset #c0a16b;
        border-radius: 2px;
        width: 300px;
    }
    .error-message {
        color: red;
    }
    .error-box {
        text-align: center;
    }
    .error-box-anim {
        border: solid 1px red;
        animation: shake 0.8s;
    }
    @keyframes shake {
        0% {
            transform: translateX(0px);
        }
        25% {
            transform: translateX(-5px);
        }
        50% {
            transform: translateX(5px);
        }
        75% {
            transform: translateX(-5px);
        }
        100% {
            transform: translateX(0px);
        }
    }
</style>
