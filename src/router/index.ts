import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "hisaab" */ '@/views/Hisaab.vue')
    },
    {
        path: '/client/:clientId',
        name: 'Client',
        component: () => import(/* webpackChunkName: "client" */ '@/views/ClientDetails.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
