<script setup></script>
<template>
  <main class="login"></main>
</template>
<style scoped lang="scss">
@keyframes login-in {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes login-out {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}
.login {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-50%);
  backdrop-filter: blur(50px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
