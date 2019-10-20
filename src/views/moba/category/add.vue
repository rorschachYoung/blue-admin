<template>
  <div class="add">
    <h1 v-if="!id">添加分类</h1>
    <h1 v-if="id">修改分类</h1>
    <el-form
      ref="form"
      class="form"
      :model="form"
      label-width="80px"
      @submit.native.prevent="submit"
    >
      <el-form-item label="父级分类">
        <el-select v-model="form.parent" placeholder="请选择" style="width:100%">
          <el-option v-for="item in parent" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{id?'确认修改':'立即创建'}}</el-button>
        <el-button @click="clear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      page:1,
      pagesize:10,
      parent: [],
      form: {
        name: "",
        desc: "",
        parent: ""
      }
    };
  },
  async created() {
    if (this.id) {
      let data = await this.axios.get(`/admin/category/${this.id}`);
      console.log(data);
      this.form = data.data;
    }
    /* 拉取下拉选择 的分类列表 */
    let data = await this.axios.get("/admin/category");
    this.parent = data.data.data;
    console.log(data);
  },
  methods: {
    async submit() /* 表单提交 */ {
      try {
        let data;
        if (this.id) {
          data = await this.axios.put(`/admin/category/${this.id}`, this.form);
        } else {
          data = await this.axios.post("/admin/category", this.form);
        }
        console.log(data);
        this.$router.push({ name: "category_list" });
      } catch (err) {
        this.$message.error("出了问题");
      }
    },
    clear() {
      if (this.id) {
        this.$router.go(-1);
      }
      this.form.name = "";
      this.form.desc = "";
    }
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>