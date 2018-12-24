<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="defaultActive"
          class="el-menu-vertical-demo"
          style="min-height: 100%"
          :default-openeds="['1']"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>菜单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="classify">分类管理</el-menu-item>
              <el-menu-item index="banner">banner图管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  // import {mapMutations} from 'vuex';
  export default {


    computed:{
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    methods: {
      // ...mapMutations(["onSubmit"])

      handleSelect(value) {
        // this.$store.commit('onSubmit',{key:"tag",value})
        // this.$emit('initData')

      }
    }
  }
</script>

<style scoped>

</style>
