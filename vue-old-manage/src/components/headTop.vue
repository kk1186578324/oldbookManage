<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!--<el-breadcrumb-item><a href="/"></a></el-breadcrumb-item>-->
    <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
    export default {


       create(){
         console.log(this.$route.path)
       },
       method:{

       }

    }
</script>

<style scoped>

</style>
