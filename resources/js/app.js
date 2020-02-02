import router from './router/routes'
import store from './store'
import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('Navigation', require('./components/Navigation').default);
Vue.component('NewsCard', require('./components/NewsCard').default);
Vue.component('Login', require('./components/Login').default);
Vue.component('Register', require('./components/Register').default);
Vue.component('App', require('./app.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

router.beforeEach(async (to, from, next) => {
    if (store.getters['auth/token'] && !store.getters['auth/check']) {
        try {
            await store.dispatch('auth/fetchUser')
                .then( () => next() )
                .catch(error => {
                    router.go();
                    console.log(error);
                })
        } catch (e) {
            console.log(e);
        }
    } else {
        next();
    }
})


const app = new Vue({
    el: '#app',
    router,
    store,
    data: {
        loginShow: false,
    },
    methods: {
        showLogin() {
            this.loginShow = true;
            console.log("Login Show");
        }
    }
});
