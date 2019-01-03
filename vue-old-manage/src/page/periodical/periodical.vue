<template>
  <div>
    <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="期刊名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="content"
        label="期刊内容"
        width="400">
      </el-table-column>
      <el-table-column
        prop="fav_nums"
        label="点赞次数"
        width="50">
      </el-table-column>
      <el-table-column
        prop="index"
        label="期号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="like_status"
        label="是否点赞"
        width="50">
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="期刊类型"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="url"
        label="音乐"
        width="180">
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片"
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="期刊名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="期刊内容" prop="content">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="点赞次数" prop="fav_nums">
          <el-input v-model="form.fav_nums"></el-input>
        </el-form-item>
        <el-form-item label="期号" prop="index">
          <el-input v-model="form.index"></el-input>
        </el-form-item>
        <el-form-item label="是否点赞" prop="like_status">
          <el-input v-model="form.like_status"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="pubdate">

          <div class="block">
            <el-date-picker
              v-model="form.pubdate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="期刊类型" prop="type">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="音乐" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="图书封面" prop="image">
          <el-upload
            class="avatar-uploader"
            action="/v1/addimg/periodical"
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
  import {addPeriodical, listPeriodical, deletePeriodical, updatePeriodical} from "@/api/getData"
  import {baseUrl, baseImgPath} from '@/config/env'

  export default {
    data() {
      return {

        dialogVisible: false,
        tableData: [],
        form: {
          content:"",
          fav_nums:"",
          image:"",
          index:"",
          like_status:"",
          pubdate:"",
          title:"",
          type:"",
          url:""
        },
        classifys:[],
        currentPage1: 1,
        pageSize: 10,
        pageTotal: 0,
        imageUrl: ""
      }
    },
    created() {
      this.initData();
    },
    methods: {
      async initData(page = 1) {
        const result = await listPeriodical({page: page, pageSize: this.pageSize});
        if (result.success) {
          this.tableData = result.content;
          this.pageTotal = result.count;
        } else {
          this.$message(result.msg);
        }
      },
      /**
       * 查找分类
       */
      async initClassify() {
        const result = await listPeriodical();
        if (result.success) {
          this.classifys = result.content;
        } else {
          this.$message(result.msg);
        }
      },
      /**
       * 添加信息
       */
      handleAdd() {
        if (!this.dialogVisible) {
          this.dialogVisible = true;
          this.initClassify();
        }
      },
      /**
       * 编辑
       * @param _id;
       *
       */
      async handleEdit(row, value) {
        if (!this.dialogVisible) {
          this.dialogVisible = true;
        }
        this.form = Object.assign({}, value);
        this.imageUrl =baseImgPath + this.form.image;
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
              result = await updatePeriodical(this.form);
            } else {
              result = await addPeriodical(this.form);
            }
            if (result.success) {
              this.$refs["form"].resetFields();
              this.imageUrl="";
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
      async handleDelete(row, value) {
        const result = await deletePeriodical(value._id);
        console.log(row, value, this.pageTotal)
        if (!row && this.pageTotal !== 1) {
          this.currentPage1 = this.currentPage1 - 1;
        }
        console.log(this.currentPage1)
        if (result.success) {
          this.initData(this.currentPage1);
        }
        this.$message(result.msg);

      },
      /**
       * 上传图片成功
       * @param
       * @param
       */
      uploadImg(response, file, fileList) {
        if (response.success) {
          this.imageUrl = baseImgPath + response.image_path;
          this.form.image = response.image_path;
        }
      },
      /**
       * 取消
       * @param
       * @param
       */
      onCancel(){
        if (this.dialogVisible) {
          this.dialogVisible = false;
          this.$refs["form"].resetFields();
          this.imageUrl = "";
        }

      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.initData(val);
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
