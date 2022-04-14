<template>
    <el-menu
        default-active="2"
        unique-opened="true"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
    >
        <template v-for="(housing, index) in menuData">
            <el-submenu :index="housing.code">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{housing.name}}</span>
                </template>

                <template v-for="(building, index) in housing.buildings">
                    <el-submenu :index="housing.code + building.code" popper-append-to-body="true">
                        <template slot="title">{{building.name}}</template>

                        <template v-for="(floor, index) in building.floors">
                            <el-menu-item :index="housing.code + building.code + floor.code" @click="openFloor(`${housing.code}#${building.code}#${floor.code}`)">{{floor.name}}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>

                
            </el-submenu>
        </template>

        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$router.push({path : '/Main'})">
            <i class="el-icon-setting"></i>
            <span slot="title">宫格展示</span>
        </el-menu-item>
        <el-submenu :index="5" popper-append-to-body="true">
            <template slot="title"><i class="el-icon-setting"></i>
                <span slot="title">ECharts图表</span></template>
            <el-menu-item index="5-1" @click="$router.push({path : '/Charts', query : {type: 'map'}})">
                <span slot="title">地图</span>
            </el-menu-item>
            <el-menu-item index="5-2" @click="$router.push({path : '/Charts', query : {type: 'line'}})">
                <span slot="title">折线图</span>
            </el-menu-item>
        </el-submenu>
        
        

    </el-menu>
</template>

<script>
import {mapActions} from "vuex";

export default {

    data() {
        return {
            originData: {},
        };
    },

    computed: {
        menuData() {
            return this.originData.housings;
        },
    },

    created() {
        this.originData = this.initData();

        this.openFloor();
    },

    methods: {
        ...mapActions('display', [
            'getUserInfo'
        ]),

        openFloor(code){
            console.log('code',code);
            let payload = new Array(30);
            payload.fill({
                name : 'YOUJUN',
                age : 90
            })
            
            let result = this.getUserInfo(payload);
            console.log('result', result);
        },

        initData() {
            let originData = {
                housings: [
                    {
                        name: "小区一",
                        code : "h1",
                        buildings: [
                            {
                                name: "栋一",
                                code : "b1",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                ],
                            },
                            {
                                name: "栋二",
                                code : "b2",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                    {
                                        name: "层三",
                                        code : "l3",
                                    },
                                    {
                                        name: "层四",
                                        code : "l4",
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        name: "小区一",
                        code : "h2",
                        buildings: [
                            {
                                name: "栋一",
                                code : "b1",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                ],
                            },
                            {
                                name: "栋二",
                                code : "b2",
                                floors: [
                                    {
                                        name: "层一",
                                        code : "l1",
                                    },
                                    {
                                        name: "层二",
                                        code : "l2",
                                    },
                                    {
                                        name: "层三",
                                        code : "l3",
                                    },
                                    {
                                        name: "层四",
                                        code : "l4",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };

            return originData;
        },
    },
};
</script>

<style>
</style>

<style scoped>
.menu {
    user-select: none;
}
</style>