<template>
    <el-container :style="{'background-color':'#303133',height:'100%'}">
    <el-header
      :style="{'background-color':'#303133',color:'#fff',padding:0}"
      style="display:flex;justify-content:space-between;"
    >
      <img src="@/assets/img/logo.png" alt width="160px" height="40px" style="margin: 10px 20px" />
      <el-menu
        :default-active="'1'"
        class="el-menu-demo"
        mode="horizontal"
        @select="()=>{}"
        background-color="#303133"
        text-color="#fff"
        active-text-color="#79bbff"
        :style="{border:'none'}"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
      </el-menu>
    </el-header>
    <el-container :style="{'background-color':'#fefefe',color:'#fff'}">
      <!-- 左侧 -->
      <el-aside width="200px" :style="{'background-color':'#303133',color:'#fff',overflow:'hidden',height:'calc(100vh - 60px'}">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#303133"
          text-color="#fff"
          active-text-color="#79bbff"
        >
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
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
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>内容管理</span>
            </template>
            <el-menu-item index="2-1">说说管理</el-menu-item>
            <el-menu-item index="2-2">图片管理</el-menu-item>
            <el-menu-item index="2-3">评论管理</el-menu-item>
            <el-menu-item index="2-4">举报管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">订单管理</el-menu-item>
            <el-menu-item index="3-3">退款管理</el-menu-item>
            <el-menu-item index="3-4">售后管理</el-menu-item>
            <el-menu-item index="3-4">供应商管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="4-1">轮播图管理</el-menu-item>
            <el-menu-item index="4-2">客服连接</el-menu-item>
            <el-menu-item index="4-3">日志管理</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>门店管理</span>
            </template>
            <el-menu-item index="5-1">门店列表</el-menu-item>
            <el-menu-item index="5-2">业务员管理</el-menu-item>
            <el-menu-item index="5-3">业绩统计</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 中间 -->
      <el-main class="elmain" >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.elmain{
  background: #f2f6fc;
  overflow-y:scroll;
  padding: 10px;
  height:calc(100vh - 60px)
}
</style>