import { useRouter } from "vue-router";
export const useDesktopStore = defineStore("desktop", () => {
  const router = useRouter();
  const openAppInfo = ref({
    viewLeft: 0, // 窗口位置
    viewTop: 0, // 窗口位置
    isOpenApp: false, // 是否打开App
    openClass: "", // 打开App的动画
    appIcon: null, // 打开App的图标
    appId: null, // 打开App的ID
  });
  function openApp(t) {
    if (!t.id) return console.error("AppId不能为空");
    if (t.appUrl) router.replace(t.appUrl);
    if (t.appIcon) openAppInfo.value.appIcon = t.appIcon;
    openAppInfo.value.appId = t.id;
    let btnXY = document.getElementById(openAppInfo.value.appId).getBoundingClientRect();
    openAppInfo.value.viewLeft = parseInt(btnXY.left) - 20;
    openAppInfo.value.viewTop = parseInt(btnXY.top) - 20;
    openAppInfo.value.isOpenApp = true;
    setTimeout(() => {
      openAppInfo.value.openClass = "open-app";
    });
  }
  function closeApp() {
    openAppInfo.value.openClass = "close-app";
    let btnXY = document.getElementById(openAppInfo.value.appId).getBoundingClientRect();
    openAppInfo.value.viewLeft = parseInt(btnXY.left) - 20;
    openAppInfo.value.viewTop = parseInt(btnXY.top) - 20;
    setTimeout(() => {
      openAppInfo.value.isOpenApp = false;
      openAppInfo.value.openClass = "";
      router.replace("/");
    }, 410);
  }
  return {
    openAppInfo,
    openApp,
    closeApp,
  };
});
