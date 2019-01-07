<template>
  <div>
    <el-button type="primary" icon="el-icon-add" @click="handleAdd">添加</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="书籍名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fav_nums"
        label="点赞数量"
        width="50">
      </el-table-column>
      <el-table-column
        prop="like_status"
        label="是否点赞"
        width="50">
      </el-table-column>
      <el-table-column
        prop="classify"
        label="书籍分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="180">
      </el-table-column>
      <el-table-column
        prop="validity"
        label="简介"
        width="180">
      </el-table-column>
      <el-table-column
        prop="score"
        label="评分"
        width="50">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="80">
        <template scope="scope">
            {{scope.row.price|MoneyFormat}}
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="出版时间"
        width="100">
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
      <el-form ref="form" :model="form"  label-width="80px">
        <el-form-item label="书籍名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="点赞数量" prop="fav_nums">
          <el-input v-model="form.fav_nums"></el-input>
        </el-form-item>
        <el-form-item label="是否点赞" prop="like_status">
          <el-input v-model="form.like_status"></el-input>
        </el-form-item>
        <el-form-item label="书籍分类" prop="classify">


          <el-select v-model="form.classify" placeholder="请选择分类">
            <el-option
              v-for="item in classifys"
              :key="item._id"
              :label="item.name"
              :value="item.name"
              size="mini"
              ></el-option>
          </el-select>
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
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="validity">
          <el-input v-model="form.validity"></el-input>
        </el-form-item>
        <el-form-item label="评分" prop="score">
          <div class="block">
            <el-rate v-model="form.score"
            ></el-rate>
          </div>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price"></el-input>
        </el-form-item>
        <el-form-item label="图书封面" prop="image">
          <el-upload
            class="avatar-uploader"
            action="/v1/addimg/books"
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
  import {addBooks, listBooks, deleteBooks, updateBooks, listClassify} from "@/api/getData"
  // import MoneyFormat from 'vue-money-format'
  import {baseUrl, baseImgPath} from '@/config/env'

  export default {
    data() {
      return {

        dialogVisible: false,
        tableData: [],
        form: {
          title: "",
          fav_nums:null,
          classify:"",
          author: "",
          like_status:null,
          score: null,
          price: null,
          image: "",
          validity:null,
          pubdate:null,
          _id:null
        },
        rules: {
          name: [
            {required: true, message: '请输入书籍名', trigger: 'blur'}
          ],
          classify: [
            {required: true, message: '请输入分类名', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者名', trigger: 'blur'}
          ],
          score: [
            {required: true, message: '请输入评分', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入价格', trigger: 'blur'},
            {type: "number", message: '价格必须为数字值'}
          ],
        },
        classifys:[],
        currentPage1: 1,
        pageSize: 10,
        pageTotal: 0,
        imageUrl: "",
        testData:100
      }
    },
    filters: {
      MoneyFormat(money) {
        if (money && money != null) {
          money = String(money);
          var left = money.split('.')[0], right = money.split('.')[1];
          right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
          var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
          return '￥'+ (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
        } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
          return '0.00';
        } else {
          return '';
        }
      }
    },
    created() {
      this.initData();
    },
    computed:{
         newPrice(){
           return this.testData = "Y"+this.testData
         }
    },
    watch:{
      testData(newVAl,oldVal){
        console.log(newVAl,oldVal)
      }
    },
    methods: {
      async initData(page = 1) {
        const result = await listBooks({page: page, pageSize: this.pageSize});
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
        const result = await listClassify();
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
        this.testData = this.testData+1
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
            console.log(this.form._id)
            if (this.form._id) {

              result = await updateBooks(this.form);
            } else {
              result = await addBooks(this.form);
            }
            if (result.success) {
              this.$refs["form"].resetFields();
              this.imageUrl="";
              this.form._id=null;
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
        const result = await deleteBooks(value._id);
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
          this.form._id = null;
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
