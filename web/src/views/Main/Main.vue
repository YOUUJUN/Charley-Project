<template>
    
    <section class="main-wrap">

        <div class="card-container">
            <template v-for="item in 100">
                <div>{{item}}</div>
            </template>
        </div>

    </section>

</template>

<script>
export default {
    name: "Main",
    methods: {},
};
</script>

<style scoped>


    .main-wrap{

    }

    .card-container{
        background: #fff;
        box-shadow: -1px -1px 5px 0 rgba(0,0,0,.1);
        margin:1.5rem;
        padding: 1rem;
    }



	.main-wrap div{
       line-height: 2rem; 
    }

	

</style>












