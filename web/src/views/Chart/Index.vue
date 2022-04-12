<template>
  
    <div class="chart-container">
        <h1>Hello</h1>
        <!-- <component :is="MapChart"></component> -->

        <map-chart height="100%" width="100%" ></map-chart>

    </div>

</template>

<script>
import MapChart from '@components/Charts/Map.vue';

export default {
    components : {
        MapChart
    }

}
</script>

<style>

</style>

<style scoped>
    .chart-container{
        position: relative;
        width:100%;
        height:50rem;
    }

</style>