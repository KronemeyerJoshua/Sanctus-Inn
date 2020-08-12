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
                        <input class="input" id="email" type="email" placeholder="Example@example.com" v-model="email">
                    </div>
                    <p class="help is-danger" v-if="errors.email">{{errorStrings.email}}</p>
                </div>

                <div class="field">
                    <label class="label">
                        Username
                    </label>
                    <div class="control">
                        <input class="input" id="usernameReg" type="text" placeholder="ExampleUsername" v-model="name">
                    </div>
                    <p class="help is-danger" v-if="errors.name">{{errorStrings.name}}</p>
                </div>

                <div class="field">
                    <label class="label">
                        Password
                    </label>
                    <div class="control">
                        <input class="input" id="password" type="password" v-model="password">
                    </div>
                    <p class="help is-danger" v-if="errors.password">{{errorStrings.password}}</p>
                </div>

                <div class="field">
                    <label class="label">
                        Confirm Password
                    </label>
                    <div class="control">
                        <input class="input" type="password" v-model="cpassword">
                    </div>
                    <p class="help is-danger" v-if="errors.password">{{errorStrings.cpassword}}</p>
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
    import * as bulmaToast from "bulma-toast";
    export default {
        data() {
            return {
                email: '',
                name: '',
                password: '',
                cpassword: '',
                errors: {
                    email: true,
                    name: true,
                    password: true
                },
                errorStrings: {
                    email: '',
                    name: '',
                    password: '',
                    cpassword: ''
                }
            }
        },
        methods: {
            /**
             * Validates all the registration fields manually
             * @returns {boolean} All registration fields are valid (true|false)
             */
            isValid() {
                this.validateEmail(this.email);
                this.validatePassword(this.password);
                this.validateUsername(this.name);
                for(const key in this.errors) {
                    if (this.errors[key] === true)
                        return false;
                }
                return true;
            },
            /**
             * Closes the registration modal
             */
            close() {
                this.$store.state.auth.showRegistration = false;
            },
            /**
             * Validates and submits registration information
             */
            register() {
                if (this.isValid()) {
                    apiClient.register({
                        email: this.email,
                        name: this.name,
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
                        console.log(error.response);
                        for (const key in error.response.data.errors) {
                            console.log(key);
                            if (key in this.errorStrings) {
                                this.errorStrings[key] = error.response.data.errors[key][0];
                                this.errors[key] = true;
                            }
                        }
                    })
                }
            },
            /**
             * Validates email
             * @param value Email string
             */
            validateEmail(value) {
                let valid = value.match('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');

                if (!valid) {
                    this.errors.email = true;
                    this.errorStrings.email = 'Email is not a valid format.'
                }
                else if(value.length === 0) {
                    this.errorStrings.email = 'Email cannot be blank.';
                    this.errors.blankEmail = true;
                    this.errors.email = false;
                }
                else {
                    this.errors.email = false;
                    this.errorStrings.email = '';
                }
            },
            /**
             * Validates name
             * @param value Name string
             */
            validateUsername(value) {
                let valid = value.match('^[a-zA-Z0-9]*$');

                if (!valid) {
                    this.errors.name = true;
                    this.errorStrings.name = 'Username can only consist of letters and numbers';
                }
                else if (value.length === 0) {
                    this.errors.name = true;
                    this.errorStrings.name = 'Username cannot be blank';
                }
                else if (value.length > 13) {
                    this.errors.name = true;
                    this.errorStrings.name = 'Usernames are limited to 13 characters';
                }
                else {
                    this.errors.name = false;
                    this.errorStrings.name = '';
                }
            },
            /**
             * Validates password
             * @param value Password string
             */
            validatePassword(value) {
                if (value.length < 6 && this.password < 6) {
                    this.errors.password = true;
                    this.errorStrings.password = 'Password must be at least six characters';
                }
                else if(value !== this.cpassword || value !== this.password) {
                    this.errors.password = true;
                    this.errorStrings.password = "Passwords don't match";
                    this.errorStrings.cpassword = "Passwords don't match";
                }
                else {
                    this.errors.password = false;
                    this.errorStrings.password = '';
                }
            }
        },
        watch: {
            // Below are registration form watchers
            // See their individual functions
            email(value) {
                this.validateEmail(value);
            },
            name(value) {
                this.validateUsername(value);
            },
            password(value) {
                this.validatePassword(value);
            },
            cpassword(value) {
                this.validatePassword(value);
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
        background: rgba(77,77,77,0.5);
        border: 1px inset #c0a16b;
        border-radius: 2px;
        width: 300px;
    }
</style>
