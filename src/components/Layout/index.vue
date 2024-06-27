<script setup></script>
<template>
  <div class="bg">
    <div class="ipod">
      <!-- 桌面模块 -->
      <Desktop />
      <!-- 登陆模块 -->
      <Login />
    </div>
  </div>
</template>
<style scoped lang="scss">
.bg {
  width: 100vw;
  height: 100vh;
  padding: 5px;
  background-color: $c1;
  .ipod {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    overflow: hidden;
    border: 15px solid black;
    background-color: $c2;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  }
}
</style>
