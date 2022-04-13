<template>

    <div class="header">
        <section class="start"></section>

        <section class="center">

            <div class="bread-wrap">

                <breadcrumb></breadcrumb>

            </div>

            <div class="ctrl-wrap">

                <router-view name="navCtrl"/>

            </div>

        </section>

        <section class="end">

            <div class="avatar-wrap">
                <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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

export default {
    name : 'NavBar',
    
    components : {
        breadcrumb
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
        margin:0 7.5rem;
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