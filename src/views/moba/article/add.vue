<template>
  <div class="add">
    <h1 v-if="!id">添加文章</h1>
    <h1 v-if="id">修改文章</h1>
    <el-form
      ref="form"
      class="form"
      :model="form"
      label-width="80px"
      @submit.native.prevent="submit"
    >
    <el-row>
      <el-col :span="12">
              <el-form-item label="文章名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="form.categories" multiple style="width:100%;">
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      </el-col>
    </el-row>
      <el-row>
        <el-col :span="20" >
                <el-form-item label="文章内容">
        <VueEditor  v-model="form.content" useCustomImageHandler @image-added="handleImageAdded" ></VueEditor>
      </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" native-type="submit">{{id?'确认修改':'立即创建'}}</el-button>
        <el-button @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
export default {
  components:{VueEditor},
  props: {
    id: String
  },
  data() {
    return {
      categories:[],
      form: {
        title: "",
        content: "",
        categories:[],
      }
    };
  },
  async created() {
    console.log('created')
    if (this.id) {
      let data = await this.axios.get(`/admin/article/${this.id}`);
      console.log(data);
      // this.form = data.data;
      Object.assign(this.form,data.data)
    }
    let data = await this.axios.get("/admin/category");
    this.categories = data.data.data;
    console.log(this.form.categories)
    console.log(data);
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader){
      try {
          let formData = new FormData();
          formData.append("file", file);
          let res= await this.axios.post('/admin/upload',formData)
          let url = res.data.abs_img; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
      } catch (err) {
        console.log(err)
          this.$message.error('编辑图片出错了')
      }
    },
    async submit() /* 表单提交 */ {
      try {
        let data;
        if (this.id) {
          data = await this.axios.put(`/admin/article/${this.id}`, this.form);
        } else {
          data = await this.axios.post("/admin/article", this.form);
        }
        console.log(data);
        this.$router.push({ name: "article_list" });
      } catch (err) {
        this.$message.error("出了问题");
      }
    },
    clear() {
      if (this.id) {
        this.$router.go(-1);
      }
      this.form.name = "";
      this.form.categories = [];
      this.form.content = "";
    }
  }
};
</script>
<style >
/* 设置 富文本编辑器高度 */
.ql-editor{
  height: 300px;
}
</style>
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
  }
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>