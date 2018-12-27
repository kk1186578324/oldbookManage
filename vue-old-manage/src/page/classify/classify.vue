<template>
  <div>
    <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="recommend"
        label="推荐分类"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        layout="prev, pager, next"
        :total="pageTotal">
      </el-pagination>
    </div>

    <!--弹框-->

    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="form"  :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" prop="recommend">
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
  import {addClassify, listClassify,deleteClassify,updateClassify} from "@/api/getData"

  export default {
    data() {
      return {

        dialogVisible: false,
        tableData: [],
        form: {
          name: "",
          recommend: "是"
        },
        rules: {
          name: [
            {required: true, message: '请输入分类名', trigger: 'blur'},
          ]
        },
        currentPage1: 1,
        pageSize: 10,
        pageTotal: 0,
      }
    },
    created() {
      this.initData();
    },
    methods: {
      async initData(page = 1) {
        const result = await listClassify({page: page, pageSize: this.pageSize});
        if (result.success) {
          this.tableData = result.content;
          this.pageTotal = result.count;
        }else {
          this.$message(result.msg);
        }
      },
      handleAdd() {
        if (!this.dialogVisible) {
          this.dialogVisible = true;
        }
      },
      /**
       * 编辑
       * @param _id;
       *
       */
      async handleEdit(row,value) {
        if (!this.dialogVisible) {
          this.dialogVisible = true;
        }
        this.form = Object.assign({},value);
      },
      //添加保存
      async onSubmit() {
        this.$refs["form"].validate(async (valid) => {
          console.log(valid)
          if (valid) {

            if (this.dialogVisible) {
              this.dialogVisible = false;
            }
            console.log(this.form)
            var result;
            if (this.form._id) {
              result = await
              updateClassify(this.form);
            } else {
              result = await
              addClassify(this.form);
            }
            if (result.success) {
              this.$refs["form"].resetFields()
              this.form = {
                name: "",
                recommend: "是"
              }
              this.initData(this.currentPage1);
            }
            this.$message(result.msg);
          }
        })

      },
      /**
       * 删除列表
       * @param id
       */
      async handleDelete(row,value){
        const result = await deleteClassify(value._id);
        console.log(row,value,this.pageTotal)
        if(!row&&this.pageTotal!==1){
          this.currentPage1 = this.currentPage1-1;
        }
        console.log(this.currentPage1)
        if(result.success){
          this.initData(this.currentPage1);
        }
        this.$message(result.msg);

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.initData(val);
      }

    }
  }
</script>

