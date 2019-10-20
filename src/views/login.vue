<template>
  <el-container class="login">
    <div class="form">
      <h1>Blue后台管理系统</h1>
      <el-form ref="form" :model="form" >
        <el-form-item >
          <el-input v-model="form.username" placeholder="用户名:admin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码:admin"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="copyright">@Copy Rorschach</div>
    
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "admin"
      }
    };
  },
  methods: {
    async login() {
      try {
        let data = await this.axios.post('/admin/login',this.form)
        this.$message.success('登录成功')
        let {token,username} = data.data
        window.localStorage.token = token
        window.localStorage.username = username
        this.$router.push('/moba/home')
      } catch (err) {
        console.log(err)
      }
        
    }
  }
};
</script>
<style lang="scss" scoped>
h1{ 
    color:#66b1ff;
    padding-bottom: 20px;
    text-align: center;
    font-weight: bolder;
    font-size: 22px;
}
.login {
  height: 100%;
  background: linear-gradient(to bottom,skyblue,#fff);
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  border-radius: 10px;
  background: #f7f7f7;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 0;
  width: 360px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}
.form:hover {
  transform: translateY(-5px);
}
.el-form-item__label {
  text-align: center !important;
}
.btn {
  width: 45%;
}
.copyright{
    font-size: 12px;
    color:#999;
    position: absolute;
    bottom:100px;
    left: 50%;
    transform: translateX(-50%)
}
</style>

