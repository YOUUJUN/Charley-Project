import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@components/Layout/Layout.vue";

Vue.use(VueRouter);

export const constantRoutes = [
    {
        path: "/",
        name: "Layout",
        redirect: "/Main",
        component: Layout,
        children: [
			{
				path : "Main",
				name : "Main",
				components : {
                    default : () => import('@views/Main/Index.vue'),
                    navCtrl : () => import('@views/Main/Ctrl.vue'),
                    sideMenu : () => import('@views/Main/Menu.vue'),
                }
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

export const asyncRouters = [
    
]


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes : constantRoutes,
});

export default router;
