<template>

    <div class="header">
        <section class="start"></section>

        <section class="center">

            <div class="bread-wrap">
                <hamburger :is-active="sidebar.opened" @toggleClick="toggleClick"></hamburger>

                <breadcrumb class="bread-nav"></breadcrumb>

            </div>

            <div class="ctrl-wrap">

                <router-view name="navCtrl"/>

            </div>

        </section>

        <section class="end">

            <div class="avatar-wrap">
                <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar src="/images/me.jpg"></el-avatar>
                    <i class="el-icon-caret-bottom" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>

            </div>

        </section>
    </div>
  
</template>

<script>

const breadcrumb = () => import('@/components/Breadcrumb/Index.vue');
const hamburger = () => import('@/components/Hamburger/Index.vue');

import {mapGetters, mapActions} from "vuex";

export default {
    name : 'NavBar',
    
    components : {
        breadcrumb,
        hamburger
    },

    computed : {
        ...mapGetters([
            'sidebar'
        ])
    },

    methods : {

        ...mapActions('display',[
            'toggleSideBar'
        ]),

        toggleClick(){
            this.toggleSideBar();
        }

    }


}
</script>

<style>

</style>

<style scoped>
    .header{
        display: flex;
        justify-content:space-between;
        align-items: center;
        height: 100%;
        line-height: 100%;
        border-bottom: .1rem solid #f5f5f5;
        box-sizing: border-box;
    }

    .header .start, .header .center, .header .end{
        display: inline-flex;
    }

    .start{
        width:24rem;
        flex: none;
    }

    .center{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex:auto;
        margin-right: 7.5rem;
    }

    .bread-wrap{
        display:flex;
        flex-direction: row;
        align-items: center;
    }

    .bread-nav{
        margin-left:1.5rem;
    }

    .ctrl-wrap{
        display: flex;
    }

    .end{
        flex:none;
        margin-left: 1.5rem;
        margin-right:2rem;
    }

    .avatar-wrap{
        display: inline-flex;
        height: 100%;
        line-height: 100%;
        align-items: center;
        cursor: pointer;
    }
</style>