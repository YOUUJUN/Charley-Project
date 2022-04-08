import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@components/Layout/Layout.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Layout",
        redirect: "/Main",
        component: Layout,
        children: [
			{
				path : "Main",
				name : "Main",
				component : () => import('@views/Main/Main.vue')
			}
		],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
