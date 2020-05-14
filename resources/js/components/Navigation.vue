<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link :to="{ name : 'home' }" class="navbar-item">
                <img src="/images/logo.png">
            </router-link>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-main">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbar-main" class="navbar-menu">
            <div class="navbar-start" style="margin: 0 auto; width: 90%; flex-flow: row wrap; text-align: center; justify-content: space-around; ">
                <router-link :to="{ name : 'about-us' }" class="navbar-item">
                    About
                </router-link>

                <router-link :to="{ name : 'roster' }" class="navbar-item">
                    Roster
                </router-link>

                <router-link :to="{ name : 'live' }" class="navbar-item">
                    Live
                </router-link>

                <router-link :to="{ name : 'apply' }" class="navbar-item">
                    Apply
                </router-link>

                <router-link :to="{ name : 'forum' }" class="navbar-item">
                    Forum
                </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                        Tools
                    </a>

                    <div class="navbar-dropdown">
                            <router-link :to="{ name : 'apoc-calc' }" class="navbar-item">Apoc Calc</router-link>
                    </div>
                </div>
            </div>

            <div class="navbar-end" style="">
                <div class="navbar-item has-dropdown is-hoverable" v-if="userexists">

                    <a class="navbar-link is-arrowless">
                        <router-link :to="'/profile/' + userid" class="navbar-item">{{username}}</router-link>
                    </a>

                    <div class="navbar-dropdown is-left">
                        <a class="navbar-item" @click="logout">
                            Logout
                        </a>
                    </div>
                </div>

                <div class="navbar-item" v-else-if="!userexists">
                    <div class="buttons">
                        <button @click="showRegister" class="button is-uppercase is-small">
                            <strong>Sign up</strong>
                        </button>
                        <button @click="showLogin" class="button is-uppercase is-small"><strong>Login</strong></button>
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
        userid() {
            try {
                return this.$store.state.auth.user.id;
            } catch (e)
            {
            }
        },
    },
    created() {
    }

}

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});
</script>

<style scoped>
    .navbar-brand .navbar-item img {
        max-height: 2.8rem;
    }
    .navbar {
        background: rgba(0,0,0,0.3);
        border-bottom: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0px 12px 14px -14px #000;
    }
    .button
    {
        background: transparent;
        border-color: rgb(133,207,170);
        color: rgba(255,255,255,0.7);
    }
    .nav-image
    {
        top: 2px;
        opacity: 0.7;
        position: absolute;
    }
    .nav-image-parent
    {
        width: 48px;
        min-width: 40px;
    }
    .nav-image:hover
    {
        opacity: 1;
    }
    .navbar-menu .navbar-item, .navbar-link {
        font-size: 20px;
        text-transform: uppercase;
        font-weight: bold;
        font-family: 'EB Garamond', serif;
        color: rgba(150, 150, 150, 0.7);
        padding-top: 0px;
        padding-bottom: 0px;
        transition: linear 0.2s;
    }

    .navbar-menu .navbar-item:hover,
    .navbar-menu .navbar-link:hover,
    .navbar-menu .has-dropdown:hover,
    .navbar-menu .navbar-item.has-dropdown:focus .navbar-link,
    .navbar-menu .navbar-item.has-dropdown:hover .navbar-link,
    .navbar-menu .navbar-item.has-dropdown.is-active .navbar-link {
        background: none !important;
    }

    .navbar-menu .navbar-link:hover,
    .navbar-menu a.navbar-item:hover,
    .navbar-menu .navbar-dropdown a.navbar-item:hover  {

        color: #bd8647;
        text-shadow: #eea756 0 0 10px;
    }
    .navbar-menu .router-link-exact-active, .navbar-menu .router-link-active, .navbar-menu .router-link-exact-active .nav-image
    {
        opacity: 1;
        color: #bd8647 !important;
        text-shadow: #eea756 0 0 10px;
    }
    .navbar-dropdown {
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.1);
    }
    a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, .navbar-link.is-active {
        background: none;
    }
    .router-link-active {
        color: #3490dc;
    }
    @media screen and (min-width: 1024px) {
        .navbar-item.is-hoverable:hover .navbar-dropdown {
            display: block !important;
        }
        .navbar-item.is-hoverable:focus-within .navbar-dropdown {
            display: none;
        }
    }
    @media screen and (min-width: 1024px) {
        .navbar-end .navbar-dropdown .navbar-item {
            padding: 0;
            justify-content: center;
        }
    }

    @media screen and (max-width: 1023px) {
        .navbar-menu {
            background: rgba(0,0,0,0.3);
        }
    }

</style>
