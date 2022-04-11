<template>
    <section class="main-wrap">
        <div class="card-container">
            <div
                class="content-row"
                v-for="(row, index1) in chunkUserInfo"
                :key="index1"
            >
                <el-popover 
                v-for="(item, index2) in row"
                :key="index2"
                v-if="item.name"
                class="user-card"

                placement="right" 
                width="400" 
                trigger="click">
                    
                    <el-descriptions title="用户信息" direction="vertical" :column="4" border>
                        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                        <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
                        <el-descriptions-item label="备注">
                            <el-tag size="small">学校</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                    </el-descriptions>

                    <el-card
                        slot="reference"
                        @click.native="setSelected(index1, index2)"
                        :class="{ choiced: doSelected(index1, index2) }"
                    >
                        <p>
                            <span>姓名：</span><span>{{ item.name }}</span>
                        </p>
                        <p>
                            <span>年龄：</span><span>{{ item.age }}</span>
                        </p>
                    </el-card>

                </el-popover>

                <el-card
                    v-else
                    class="user-card"
                    style="visibility: hidden"
                ></el-card>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Index",

    data() {
        return {
            selected: "",
        };
    },

    filters: {},

    computed: {
        ...mapState("display", {
            displayRow: (state) => state.displayRow,
            userInfo: (state) => {
                return state.userInfo;
            },
        }),

        chunkUserInfo: function () {
            return this.chunk(this.userInfo, this.displayRow.slice(1));
        },
    },

    created() {
        console.log("userInfo", this.userInfo);
    },

    methods: {
        chunk(array, num) {
            console.log("array", array);
            console.log("num", num);
            let wrapArray = [];
            let contentArray = [];
            array.forEach((element) => {
                contentArray.push(element);
                if (contentArray.length >= num) {
                    wrapArray.push(contentArray);
                    contentArray = [];
                }
            });

            if (contentArray.length > 0) {
                let length = contentArray.length;
                console.log("contentArray.length", contentArray.length);
                contentArray.length = Number(num);
                contentArray.fill({}, length);
                wrapArray.push(contentArray);
            }

            console.log("wrapArray", wrapArray);
            return wrapArray;
        },

        setSelected(index1, index2) {
            this.selected = `${index1}#${index2}`;
            console.log("this.selected", this.selected);
        },

        doSelected(index1, index2) {
            return this.selected === `${index1}#${index2}`;
        },
    },
};
</script>

<style scoped>
.main-wrap {
}

.main-wrap div {
    line-height: 2rem;
}

.card-container {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    flex-wrap: nowrap;
    background: #fff;
    box-shadow: -1px -1px 5px 0 rgba(0, 0, 0, 0.1);
    margin: 1.5rem;
    padding: 1rem;
}

.content-row {
    display: flex;
    flex-direction: row;
}

.user-card {
    width: 6rem;
    margin: 0.5rem;
    margin-bottom: 1rem;
    flex: auto;
    cursor: pointer;
}

.choiced {
    border: 1px solid red;
}

.filler {
    width: 16rem;
    border: 1px;
    margin-bottom: 1rem;
}
</style>












