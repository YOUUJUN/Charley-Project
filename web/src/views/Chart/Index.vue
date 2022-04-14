<template>
  
    <div class="chart-container">
        <component :is="dyncChart"></component>

        <!-- <map-chart height="100%" width="100%" ></map-chart> -->

    </div>

</template>

<script>
import LineChart from '@components/Charts/LineChart.vue';
import MapChart from '@/components/Charts/Map.vue';

export default {
    components : {
        LineChart,
        MapChart
    },

    computed : {
        dyncChart (){
            console.log('$route', this.$route);
            let query = this.$route.query;
            if(!query.type || query.type === 'map'){
                return 'MapChart';
            }else if(query.type && query.type === 'line'){
                return 'LineChart';
            }
            
        }
    },

    created(){

    }

}
</script>

<style>

</style>

<style scoped>
    .chart-container{
        /* position: relative;
        width:100%;
        height:50rem; */
        position: absolute;
        width: 100%;
        top:0;
        bottom:0;
    }

</style>