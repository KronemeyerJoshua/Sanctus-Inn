import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const home = () => import('../views/home.vue')
const aboutUs = () => import('../views/aboutUs.vue')
const roster = () => import('../views/roster.vue')
const live = () => import('../views/live.vue')
const forum = () => import('../views/forum.vue')
const apocCalc = () => import('../views/apocCalc.vue')
const apply = () => import('../views/apply.vue')
const threads = () => import('../views/forum/threads')
const threadPosts = () => import('../views/forum/threadPosts')
const profile = () => import('../views/user/profile')


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path: '/about-us',
            name: 'about-us',
            component: aboutUs,
        },
        {
            path: '/roster/:pageNumber?',
            name: 'roster',
            component: roster,
        },
        {
            path: '/live',
            name: 'live',
            component: live,
        },
        {
            path: '/forum',
            name: 'forum',
            meta: { keepAlive: true },
            component: forum,
        },
        {
            path: '/apoc-calc/:premade?',
            name: 'apoc-calc',
            component: apocCalc,
        },
        {
            path: '/apply',
            name: 'apply',
            component: apply,
        },
        {
            path: '/forum/:id',
            name: 'category',
            component: threads,
        },
        {
            path: '/forum/:id/:threadId/:page?',
            name: 'threadPreview',
            props: true,
            component: threadPosts,
        },
        {
            path: '/profile/:userId',
            name: 'profile',
            component: profile,
        },
    ]
})

export default router
