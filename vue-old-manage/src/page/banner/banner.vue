<template>
  <div>
    <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="图片名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="图片地址"
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
        <el-form-item label="图片上传" prop="recommend">

          <el-upload
            class="avatar-uploader"
            action="/v1/addimg/banner"
            :show-file-list="false"
            :on-success="uploadImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>




      </el-form>
      <span slot="footer" class="dialog-footer">
           <el-button @click="onCancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
  import {addBanner,listBanner,updateBanner,deleteBanner} from "@/api/getData"
  import {baseUrl, baseImgPath} from '@/config/env'
  export default {
    data() {
      return {

        dialogVisible: false,
        tableData: [],
        form: {
          name: "",
          url:""
        },
        rules: {
          name: [
            {required: true, message: '请输入分类名', trigger: 'blur'},
          ]
        },
        currentPage1: 1,
        pageSize: 10,
        pageTotal: 0,
        imageUrl: ''
      }
    },
    created() {
      this.initData();
    },
    methods: {
      async initData(page = 1) {
        const result = await listBanner({page: page, pageSize: this.pageSize});
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
        this.form= Object.assign({},value);
        this.imageUrl =baseImgPath + this.form.url;
      },
      //添加保存
      async onSubmit() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.dialogVisible) {
              this.dialogVisible = false;
            }
            var result;
            if (this.form._id) {
              result = await updateBanner(this.form);
            } else {
              result = await addBanner(this.form);

            }
            if (result.success) {
              this.$refs["form"].resetFields();
              this.form = {
                name: "",
                url: ""
              }
              this.imageUrl = "";
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
        const result = await deleteBanner(value._id);
        if(!row && this.pageTotal!==1){
          this.currentPage1 = this.currentPage1-1;
        }
        if(result.success){
          this.initData(this.currentPage1);
        }
        this.$message(result.msg);

      },
      /**
       * 上传图片成功
       * @param
       * @param
       */
      uploadImg(response, file, fileList){
        if(response.success){
          this.imageUrl = baseImgPath+response.image_path;
          this.form.url = response.image_path;
        }
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.initData(val);
      },
    /**
     * 取消
     * @param
     * @param
     */
      onCancel(){
        if (this.dialogVisible) {
          this.dialogVisible = false;
          this.form = {
            name: "",
            url: ""
          }
          this.imageUrl = "";
        }

      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
