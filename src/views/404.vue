<template>
  <h1 class="notfound">
    当前页不存在!
    <router-link class='link' :to="'/'">点击返回首页</router-link>
  </h1>
</template>

<script>
export default {

}
</script>

<style>
.notfound{
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-50%);
}
.link{
  text-decoration: none;
  color:skyblue;
}
</style>