<template>
  <div>
    <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="分类名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="推荐分类"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!--弹框-->

    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-radio-group v-model="form.recommend">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit()">确 定</el-button>
     </span>
    </el-dialog>

  </div>
</template>

<script>
  import {addClassify} from "@/api/getData"
  export default {
    data() {
      return {

        dialogVisible:false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        form:{
          name:"",
          recommend:"是"
        }
      }
    },
    methods:{
      handleAdd(){
        if(!this.dialogVisible){
          this.dialogVisible =true;
        }
      },
      async onSubmit(){
        if(this.dialogVisible){
          this.dialogVisible =false;
        }

        const result = await addClassify(this.form);
        console.log(result)




      }

    }
  }
</script>
