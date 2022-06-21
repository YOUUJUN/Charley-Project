import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@components/Layout/Layout.vue";
import Menu from "@views/Main/Menu.vue";

Vue.use(VueRouter);

export const constantRoutes = [

    // {
    //     path: '/404',
    //     component: () => import('@/views/Error/404.vue'),
    // },

    {
        path: "/",
        redirect: "/Main",
        name: "Index",
        meta : {
            title : "首页"
        }
    },

    {
        path: "/Main",
        redirect: "/Main/list",
        component: Layout,
        meta : {
            title : "用户展示"
        },
        children: [
			{
				path : "list",
				name : "userList",
				components : {
                    default : () => import('@views/Main/Index.vue'),
                    navCtrl : () => import('@views/Main/Ctrl.vue'),
                    sideMenu : Menu,
                },
                meta : {
                    title : "用户列表"
                },
			},

            {
                path : "Info",
                name : "userInfo",
                components : {
                    default : () => import('@views/Main/Detail.vue'),
                    sideMenu : Menu,
                },
                meta : {
                    title : "用户信息"
                },
            }
            
		]
    },



    {
        path : "/Charts",
        name : "Charts",
        component: Layout,
        children : [
            {
                path : '',
                components : {
                    default : () => import('@views/Chart/Index.vue'),
                    sideMenu : Menu,
                }
            }
        ],
        meta : {
            title : "ECharts图表"
        },
    },

    {
        path : "/Three",
        name : "Three",
        component: Layout,
        children : [
            {
                path : '',
                components : {
                    default : () => import('@views/Three/Index.vue'),
                    sideMenu : Menu,
                }
            }
        ],
        meta : {
            title : "Three测试"
        },
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
