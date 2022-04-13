<template>
    <el-breadcrumb separator="/">

        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
        <el-breadcrumb-item v-for="(item, index) in navList" :key="item.path">
            <span v-if="index==navList.length-1">{{item.meta.title}}</span>
            <a v-else href="/" @click="handleLink(item)">{{item.meta.title}}</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

    data(){
        return {
            navList : []
        }
    },

    watch : {
        $route (route){
            if (route.path.startsWith('/redirect/')) {
                return;
            }
            this.getBreadcrumb()
        }
    },

    created(){
        console.log('router', this.$router);
        this.getBreadcrumb();
    },

    methods: {

        getBreadcrumb (){
            let matched = this.$route.matched.filter( route => route.meta && route.meta.title);
            matched = [{ path: '/Main', meta: { title: '首页' }}].concat(matched);

            console.log('matched', matched);

            this.navList = matched;
        },


        handleLink(item){
            this.$router.push(item.path);
        }

    }

};
</script>

<style>
</style>