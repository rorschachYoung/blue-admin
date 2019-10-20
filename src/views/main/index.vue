<template>
  <div class="main">
    <el-container>
      <el-header class="header-layout">
        <img src="@/assets/img/logo.png" alt width="160px" height="40px" />
        <el-menu
          :unique-opened="true"
          mode="horizontal"
          background-color="#303133"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="logout">退出登录</el-menu-item>
        </el-menu>
      </el-header>
      <!-- content -->
      <el-container class="content">
        <el-aside width="220px" class="aside-layout">
          <el-menu
            :default-active="path"
            background-color="#303133"
            text-color="#fff"
            active-text-color="#79bbff"
            router
          >
            <el-menu-item index="/main/home">
              <i class="el-icon-menu"></i>
              <span slot="title">试听列表</span>
            </el-menu-item>
            <el-menu-item index="/main/add">
              <i class="el-icon-menu"></i>
              <span slot="title">添加试听</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">用户列表</el-menu-item>
              <el-menu-item index="1-2">封号列表</el-menu-item>
              <el-menu-item index="1-3">VIP列表</el-menu-item>
              <el-menu-item index="1-4">用户统计</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "/main/home"
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.path = this.$route.path;
  },
  watch: {
    $route(path) {
      console.log(path);
      this.path = path.path;
    }
  }
};
</script>
<style lang="scss" scoped>
/* 1.给header添加el-menu,清除两侧默认样式 */
.el-header {
  padding: 0;
}
/* 2. 给header添加布局 使logo和menu菜单趋于两侧*/
.header-layout {
  display: flex;
  justify-content: space-between;
  background-color: #303133;
  img {
    width: 160px;
    height: 40px;
    margin-left: 20px;
    margin-top: 10px;
  }
}
/* content 样式 */
.content {
  background-color: #fefefe;
}
/* aside 布局  */
.aside-layout {
  background-color: #303133;
  height: calc(100vh - 60px);
  overflow: hidden;
  box-sizing: border-box;
}
.main {
  height: calc(100vh - 60px);
}
</style>