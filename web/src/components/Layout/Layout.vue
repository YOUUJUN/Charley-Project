<template>
    <el-container class="root-wrap">
        <el-header class="header-wrap">
            <nav-bar></nav-bar>
        </el-header>

        <el-container class="main-wrap">
            
            <el-aside class="aside-wrap" width="240px">
                <div class="aside">
                    <el-scrollbar style="height: 100%;">
                    <side-bar></side-bar>
                    </el-scrollbar>
                </div>
            </el-aside>

            <el-container>
                <el-main class="content-wrap">
                    <div class="content">
                        <el-scrollbar style="height: 100%;">
                            <router-view />
                        </el-scrollbar>
                    </div>
				</el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>

    </el-container>
</template>

<script>
const SideBar = () => import('./Parts/SideBar.vue')
const NavBar = () => import('./Parts/NavBar.vue')

export default {
    name: "Layout",

    components : {
        SideBar,
        NavBar
    },

    methods: {},
};
</script>

<style>
/* .el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
} */
</style>

<style scoped>
	.root-wrap{
		height: 100%;
	}

	.header-wrap{
		flex:none;
        height: 6rem;
        line-height: 6rem;
        padding:0;
	}

	.main-wrap{
		flex:auto;
	}

    .content-wrap, .aside-wrap{
        position: relative;
    }

    .content, .aside{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        overflow: hidden;
    }

    .content-wrap{
        background: #f5f5f5;
    }

    /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
    }
	

</style>












