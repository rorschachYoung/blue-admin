<template>
  <div class="add">
    <h1 v-if="!id">添加物品</h1>
    <h1 v-if="id">修改物品</h1>
    <el-form
      ref="form"
      class="form"
      :model="form"
      label-width="80px"
      @submit.native.prevent="submit"
    >
      <el-form-item label="物品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          :auto-upload="false"
          action="http://www.rorscloud.top:4000/admin/upload"
          list-type="picture-card"
          :headers="getAuthHeader()"
          :show-file-list="false"
          :on-success="afterUpload"
          :on-change='changeUpload'
        >
          <i v-if="!form.abs_img" class="el-icon-plus"></i>
          <img v-else :src="form.abs_img" class="avatar" width="100%" height="100%" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{id?'确认修改':'立即创建'}}</el-button>
        <el-button @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog width="60%" :visible.sync="dialogVisible">
      imgname:'',
      <vuecropper :chooseimg="bloburl" :imgname="imgname" @after-upload="afterUpload"></vuecropper>
    </el-dialog>
  </div>
</template>

<script>
import vuecropper from "@/components/vuecropper";
export default {
  components: {
    vuecropper
  },
  props: {
    id: String
  },
  data() {
    return {
      dialogVisible: false,
      bloburl:'',
      imgname:'',
      form: {
        name: "",
        rel_img: "",
        abs_img: ""
      }
    };
  },
  async created() {
    if (this.id) {
      let data = await this.axios.get(`/admin/item/${this.id}`);
      console.log(data);
      this.form = data.data;
    }
  },
  methods: {
    afterUpload(res) {
      console.log(res);
      this.form.abs_img = res.abs_img;
      this.form.rel_img = res.rel_img;
      this.dialogVisible =false;
      this.bloburl = '';
      this.imgname= '';
    },
    async submit() /* 表单提交 */ {
      try {
        let data;
        if (this.id) {
          data = await this.axios.put(`/admin/item/${this.id}`, this.form);
        } else {
          data = await this.axios.post("/admin/item", this.form);
        }
        console.log(data);
        this.$router.push({ name: "item_list" });
      } catch (err) {
        this.$message.error("出了问题");
      }
    },
    clear() {
      if (this.id) {
        this.$router.go(-1);
      }
      this.form.name = "";
      this.form.abs_img = "";
      this.form.rel_img = "";
    },
    changeUpload(file, fileList) {
      const isLt300k = file.size / 1024  < 300
      if (!isLt300k) {
        this.$message.error('上传文件大小不能超过 300k!')
        return false
      }
      console.log(file)
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.bloburl = file.url
        this.imgname = file.name
        this.dialogVisible = true
      })
    },
    
  }
};
</script>
<style lang="scss" scoped>
.add {
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    padding-left: 10px;
  }
  .form {
    margin-top: 40px;
    width: 400px;
  }
}
</style>