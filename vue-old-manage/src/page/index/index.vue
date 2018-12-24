<template>
  <div>
    <el-container>
      <el-aside width="200px" class="left-menu">
        <left-menu></left-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <head-Top></head-Top>
        </el-header>
        <el-main>
          <keep-alive>
          <router-view></router-view>
        </keep-alive>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import headTop from "@/components/headTop"
  import leftMenu from "@/components/leftMenu"
  export default {

    data() {
      return {}

    },
    components: {
      headTop,
      leftMenu
    },
    method:{


    }


  }
</script>


<style scoped>
  .header{
    padding-top:20px;
    height: 56px!important;
    background-color: #ddebfc;
  }
  .left-menu{

  }

</style>
