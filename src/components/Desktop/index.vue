<script setup>
import AppButton from "./AppButton.vue";
import btn1 from "@/assets/img/drinks/MintLemon1.svg";

const system = useSystemsStore();
const btnRef = ref(null);
const viewLeft = ref(0);
const viewTop = ref(0);
const isOpenApp = ref(false);
function openApp() {
  console.log(btnRef.value);
  return
  isOpenApp.value = true;
  let btnXY = btnRef.value.getBoundingClientRect();
  viewLeft.value = btnXY.left;
  viewTop.value = btnXY.top;
}
</script>
<template>
  <div class="desktop">
    <!-- 顶部 -->
    <DesktopHeader />
    <!-- 屏幕应用 -->
    <div class="apps"></div>
    <!-- 底部应用坞 -->
    <div class="docks">
      <AppButton :icon="btn1" @click="openApp" ref="btnRef" />
    </div>

    <div class="app-view" v-if="isOpenApp" :class="openClass" :style="'left:' + viewLeft + 'px;top: ' + viewTop + 'px;'">
      <img :src="icon" alt="app-icon" v-if="icon" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.desktop {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;

  .apps {
    width: 80%;
    height: calc(100% - 70px - 120px);
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50px;
  }
  .docks {
    backdrop-filter: blur(20px);
    max-width: calc(100% - 30px);
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 30px;
    display: flex;

    .docks-li {
      margin-right: 15px;
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(162, 248, 136);

      &:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
  .app-view {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .open-app {
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);
    left: 20px !important;
    top: 20px !important;
  }
}
</style>
