<script setup>
import btn1 from "@/assets/img/drinks/MintLemon1.svg";
import btn2 from "@/assets/img/drinks/MintLemon2.svg";
import btn3 from "@/assets/img/drinks/MintLemon3.svg";
import btn4 from "@/assets/img/drinks/MintLemon4.svg";
const system = useSystemsStore();
const { openAppInfo, openApp } = useDesktopStore();
const docks = ref([
  { appName: "", appUrl: "/home", appIcon: btn1, id: toolsGenerateRandomString(32) },
  { appName: "", appUrl: "/setting", appIcon: btn2, id: toolsGenerateRandomString(32) },
  { appName: "", appUrl: "/home", appIcon: btn3, id: toolsGenerateRandomString(32) },
  { appName: "", appUrl: "/home", appIcon: btn4, id: toolsGenerateRandomString(32) },
]);
</script>
<template>
  <div class="desktop">
    <!-- 顶部 -->
    <DesktopHeader />
    <!-- 屏幕应用 -->
    <div class="apps"></div>
    <!-- 底部应用坞 -->
    <div class="docks">
      <AppButton class="docks-li" :icon="t.appIcon" :id="t.id" @click="openApp(t)" ref="btnRef" v-for="t in docks" />
    </div>

    <!-- 打开的App -->
    <div class="app-view" v-if="openAppInfo.isOpenApp" :class="openAppInfo.openClass" :style="'left:' + openAppInfo.viewLeft + 'px;top: ' + openAppInfo.viewTop + 'px;'">
      <img :src="openAppInfo.appIcon" v-if="openAppInfo.appIcon" />
      <RouterView class="view-box" />
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
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    // background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
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
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
      transition-delay: 500ms;
      transition: opacity 0.3s;
    }
    .view-box {
      opacity: 0;
      transition: opacity 0.3s;
    }
  }
  .open-app {
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);
    left: 0px !important;
    top: 0px !important;
    border-radius: 0px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(40px);
    z-index: 800;
    img {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    .view-box {
      opacity: 1;
    }
  }

  .close-app {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(40px);
    z-index: 800;
    img {
      position: absolute;
      opacity: 1;
      width: 100%;
      height: 100%;
    }
    .view-box {
      opacity: 0;
    }
  }
}
</style>
