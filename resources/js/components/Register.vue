<template>
    <div class="modal">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">

            <div class="loginForm" v-on:keydown.enter="register">
                <div class="modal-title">Registration</div>

                <div class="field">
                    <label class="label form__label">
                        Email
                    </label>
                    <div class="control">
                        <input class="input" id="email" type="email" placeholder="Example@example.com" v-model="$v.email.$model" :class="($v.email.$error || email === '' )&& invalid ? 'is-danger' : ''">
                    </div>
                    <p class="help is-danger" v-if="!$v.email.required && invalid">Email is required</p>
                    <p class="help is-danger" v-if="!$v.email.email && invalid">Email format is invalid</p>
                </div>

                <div class="field">
                    <label class="label">
                        Username
                    </label>
                    <div class="control">
                        <input class="input" id="usernameReg" type="text" placeholder="ExampleUsername" v-model="$v.username.$model" :class="($v.username.$error || username === '' )&& invalid ? 'is-danger' : ''">
                    </div>
                    <p class="help is-danger" v-if="!$v.username.required && invalid">Username is required</p>
                </div>

                <div class="field">
                    <label class="label">
                        Password
                    </label>
                    <div class="control">
                        <input class="input" id="password" type="password" v-model="$v.password.$model" :class="($v.password.$error || password === '' )&& invalid ? 'is-danger' : ''">
                    </div>
                    <p class="help is-danger" v-if="!$v.password.required && invalid">Password is required</p>
                    <p class="help is-danger" v-if="!$v.password.minLength && invalid">Password needs to be at least 6 characters</p>
                </div>

                <div class="field">
                    <label class="label">
                        Confirm Password
                    </label>
                    <div class="control">
                        <input class="input" type="password" v-model="$v.cpassword.$model" :class="($v.cpassword.$error || cpassword === '' )&& invalid ? 'is-danger' : ''">
                    </div>
                    <p class="help is-danger" v-if="!$v.cpassword.sameAs">Passwords do not match</p>
                </div>

                <div class="has-text-centered">
                        <button class="button" @click="register">Register</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import apiClient from '../services/EventService'
    import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
    import * as bulmaToast from "bulma-toast";
    export default {
        data() {
            return {
                email: '',
                username: '',
                password: '',
                cpassword: '',
                invalid: false,
            }
        },
        methods: {
            close() {
                this.$emit('close-modal')
            },
            register() {
                if (this.$v.$invalid) {
                    this.invalid = true
                } else {
                    apiClient.register({
                        email: this.email,
                        name: this.username,
                        password: this.password,
                        password_confirmation: this.cpassword
                    }).then((response) => {
                        this.$store.dispatch('auth/saveToken', response.data)
                        this.$store.dispatch('auth/setUser', response.data)
                        bulmaToast.toast({
                            message: "Registered successfully!",
                            type: "is-success",
                            position: "top-center"
                        })
                        this.$router.go()
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            },
        },
        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6)
            },
            cpassword: {
                sameAs: sameAs('password')
            },
            username: {
                required
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
