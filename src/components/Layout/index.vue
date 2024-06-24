<script setup></script>
<template>
  <div class="bg">
    <div class="ipod">
      <slot></slot>
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
    background-color: black;
    background-image: url("@/assets/img/bg.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  }
}
</style>
