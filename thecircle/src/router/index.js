import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/authentication/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/authentication/Register.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/user/Profile')
    },
    {
        path: '/topic', component: () => import('../views/topic/Topic'),
        children: [
            {path: '', name: 'topic', component: () => import('../views/topic/TopicList')},
            {path: 'create', name: 'topicCreate', component: () => import('../views/topic/TopicCreate')},
            {path: 'create/:id', name: 'replyCreate', component: () => import('../views/reply/CreateReply')},
            {path: 'topic/:id', name: 'topicDetail', component: () => import('../views/topic/TopicDetail')},
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
