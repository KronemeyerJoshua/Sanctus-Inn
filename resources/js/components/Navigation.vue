<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbar" class="navbar-menu">
            <div class="navbar-start" style="flex-grow: 1; justify-content: center">
                <router-link :to="{ name : 'about-us' }" class="navbar-item">
                    About
                </router-link>

                <router-link :to="{ name : 'roster' }" class="navbar-item">
                    Roster
                </router-link>

                <router-link :to="{ name : 'live' }" class="navbar-item">
                    Live
                </router-link>

                <router-link :to="{ name : 'home' }">
                    <img src="/images/logo.png" alt="" style="">
                </router-link>

                <router-link :to="{ name : 'apply' }" class="navbar-item">
                    Apply
                </router-link>

                <router-link :to="{ name : 'forum' }" class="navbar-item">
                    Forum
                </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Tools
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            Apoc Calc
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end" style="float: right; width: 0;">
                <div class="navbar-item has-dropdown is-hoverable" v-if="userexists">

                    <a class="navbar-link">
                        {{username}}
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item" @click="logout">
                            Logout
                        </a>
                    </div>
                </div>

                <div class="navbar-item" v-else-if="!userexists">
                    <div class="buttons">
                        <button @click="showRegister" class="button is-uppercase">
                            <strong>Sign up</strong>
                        </button>
                        <button @click="showLogin" class="button is-uppercase"><strong>Login</strong></button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            isLoaded: false,
        }
    },

    methods: {
        showLogin() {
            this.$emit('show-login-modal')
        },
        showRegister() {
            this.$emit('show-register-modal')
        },
        async logout() {
            await this.$store.dispatch('auth/logout')
            location.reload();
        }
    },
    computed: {
        userexists() {
            try {
                return localStorage.getItem('token').length > 0;
            } catch (e)
            {
                return false;
            }

        },
        username() {
                try {
                    return this.$store.state.auth.user.name;
                } catch (e)
                {
                }
        },
    },
    created() {
    }
}
</script>

<style scoped>
    .navbar {
        background: transparent;
        border-bottom: 1px solid white;
        backdrop-filter: blur(8px);
    }

    .navbar-item, .navbar-link {
        font-size: 22px;
        text-transform: uppercase;
        font-weight: bold;
        font-family: 'IM Fell Great Primer SC', serif;
        color: rgba(255, 255, 255, 0.7)
    }

    .navbar-item:hover, .navbar-link:hover, .has-dropdown:hover, .navbar-item.has-dropdown:focus .navbar-link, .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {
        background: none !important;
    }

    .navbar-link:hover, .navbar-dropdown a.navbar-item:hover {
        color: #3490dc;
    }

    .navbar-dropdown {
        background: rgba(10,2,59,0.9);
        backdrop-filter: blur(8px);
        border: white 1px solid;
    }
    a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, .navbar-link.is-active {
        background: none;
    }
    .router-link-active {
        color: #3490dc;
    }
</style>
