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
            <el-menu-item index="/moba/home">
              <i class="el-icon-rank"></i>
              <span slot="title">管理中心</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-postcard"></i>
                <span>英雄管理</span>
              </template>
              <el-menu-item index="/moba/hero_list">英雄列表</el-menu-item>
              <el-menu-item index="/moba/hero_add">添加英雄</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item index="/moba/article_list">文章列表</el-menu-item>
              <el-menu-item index="/moba/article_add">添加文章</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-money"></i>
                <span>广告轮播Banner</span>
              </template>
              <el-menu-item index="/moba/ads_list">广告列表</el-menu-item>
              <el-menu-item index="/moba/ads_edit">广告管理</el-menu-item>
              <el-menu-item index="/moba/ads_add">广告添加</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-document-add"></i>
                <span>分类管理</span>
              </template>
              <el-menu-item index="/moba/category_list">分类列表</el-menu-item>
              <el-menu-item index="/moba/category_add">添加分类</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-takeaway-box"></i>
                <span>物品管理</span>
              </template>
              <el-menu-item index="/moba/item_list">物品列表</el-menu-item>
              <el-menu-item index="/moba/item_add">添加物品</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>管理员用户</span>
              </template>
              <el-menu-item index="/moba/adminuser_list">管理员列表</el-menu-item>
              <el-menu-item index="/moba/adminuser_add">添加管理员</el-menu-item>
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
      localStorage.token = "";
      this.$message.success("退出登录");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.path = this.$route.path;
  },
  watch: {
    $route(path) {
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
  background: #eee;
}
</style>