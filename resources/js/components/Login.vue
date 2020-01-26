<template>
    <div class="modal">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">

            <div class="loginForm" v-on:keydown.enter="login">
                <div class="modal-title">Welcome back!</div>
                <div class="field">
                    <label class="label">
                        Username
                    </label>
                    <div class="control">
                        <input class="input" id="username" type="text" placeholder="ExampleUsername" v-model="username">
                    </div>
                </div>

                <div class="field">
                    <label class="label">
                        Password
                    </label>
                    <div class="control">
                        <input class="input" type="password" v-model="password">
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
            }
        },
        methods: {
            close() {
                this.$emit('close-login-modal')
            },
            login() {
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
                    console.log(error)
                })
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
    }
    .label {
        color: rgba(255,255,255,0.8) !important;
    }
    .modal-content {
        background: rgba(10,2,59,0.5);
        border: solid 1px white;
        border-radius: 6px;
        width: 300px;
    }
</style>
