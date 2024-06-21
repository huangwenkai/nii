<script setup></script>
<template>
  <div class="nii-layout-bg">
    <div class="nii-layout-border">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.nii-layout-bg {
  background-color: $c1;
  position: relative;
  padding: 5px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .nii-layout-border {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 15px solid black;
    border-radius: 40px;
    overflow: hidden;
    background-image: url("@/assets/img/bg.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
  }
}
</style>
