<template>
    
    <section class="main-wrap">

        <div class="card-container">
            <template v-for="(row,index1) in chunkUserInfo">

                <div class="content-row">
                    <template v-for="(item,index2) in row">
                        <!-- <div class="card-wrap"> -->
                            <template v-if="item.name">
                                <el-card class="user-card" @click.native="setSelected(index1, index2)" :class="{choiced :  doSelected(index1, index2)}">
                                    <p><span>姓名：</span><span>{{item.name}}</span></p>
                                    <p><span>年龄：</span><span>{{item.age}}</span></p>
                                </el-card>
                            </template>
                            
                            <template v-else>
                                <el-card class="user-card" style="visibility:hidden;"></el-card>
                            </template>
                            
                        <!-- </div> -->
                    </template>

                </div>

            </template>
        </div>

    </section>

</template>

<script>
import {mapState} from 'vuex';

export default {
    name: "Index",

    data() {
        return {
            selected : '',
        };
    },

    filters: {
        
    },

    computed: {
        
        ...mapState('display', {
            displayRow : state => state.displayRow,
            userInfo : state => {
                return state.userInfo;
            }
        }),

        chunkUserInfo : function(){
            return this.chunk(this.userInfo, this.displayRow.slice(1));
        }
    },

    created() {
        console.log('userInfo', this.userInfo);
    },
    

    methods: {
        chunk(array, num){
            console.log('array', array);
            console.log('num', num);
            let wrapArray = [];
            let contentArray = [];
            array.forEach(element => {
                contentArray.push(element);
                if(contentArray.length >= num){
                    wrapArray.push(contentArray);
                    contentArray = [];
                }
            });

            if(contentArray.length > 0){
                let length = contentArray.length;
                console.log('contentArray.length', contentArray.length);
                contentArray.length = num + 1;
                contentArray.fill({}, length);
                wrapArray.push(contentArray);
            }

            console.log('wrapArray', wrapArray);
            return wrapArray;
        },

        setSelected(index1, index2){
            this.selected = `${index1}#${index2}`;
            console.log('this.selected', this.selected);
        },

        doSelected(index1, index2){
            return this.selected === `${index1}#${index2}`;
        }
    },
};
</script>

<style scoped>


    .main-wrap{

    }

    .main-wrap div{
       line-height: 2rem; 
    }

    .card-container{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        flex-wrap:nowrap;
        background: #fff;
        box-shadow: -1px -1px 5px 0 rgba(0,0,0,.1);
        margin:1.5rem;
        padding: 1rem;
    }

    .content-row{
        display: flex;
        flex-direction: row;

    }

    .user-card{
        width: 6rem;
        margin:0.5rem;
        margin-bottom: 1rem;
        flex: auto;
        cursor:pointer;
    }

    .choiced{
        border:1px solid red;
    }

    .filler{
        width: 16rem;
        border: 1px;
        margin-bottom: 1rem;
    }

    
    
	

</style>












