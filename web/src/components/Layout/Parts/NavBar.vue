<template>

    <div class="header">
        <section class="start"></section>

        <section class="center"></section>

        <section class="end">

            <div class="avatar-wrap">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>

        </section>
    </div>
  
</template>

<script>
export default {

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
        padding:2rem;
        border-bottom: 1px solid #f5f5f5;
        box-sizing: border-box;
    }

    .header .start, .header .center, .header .end{
        display: inline-flex;
    }

    .avatar-wrap{
        display: inline-flex;
        height: 100%;
        line-height: 100%;
        align-items: center;
    }
</style>