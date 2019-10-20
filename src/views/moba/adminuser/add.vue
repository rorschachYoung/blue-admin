<template>
  <div class="add">
    <h1 v-if="!id">添加管理员</h1>
    <h1 v-if="id">修改管理员</h1>
    <el-form
      ref="form"
      class="form"
      :model="form"
      label-width="80px"
      @submit.native.prevent="submit"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" :placeholder="id?'[已加密]':'请输入密码'"></el-input>
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
        username: "",
        password: "",
      }
    };
  },
  async created() {
    if (this.id) {
      let data = await this.axios.get(`/admin/adminuser/${this.id}`);
      console.log(data);
      this.form = data.data;
    }
  },
  methods: {
    async submit() /* 表单提交 */ {
      try {
        let data;
        if (this.id) {
          data = await this.axios.put(`/admin/adminuser/${this.id}`, this.form);
        } else {
          data = await this.axios.post("/admin/adminuser", this.form);
        }
        console.log(data);
        this.$router.push({ name: "adminuser_list" });
      } catch (err) {
        this.$message.error("出了问题");
      }
    },
    clear() {
      if (this.id) {
        this.$router.go(-1);
      }
      this.form.username = "";
      this.form.password = "";
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