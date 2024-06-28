import { useRouter } from "vue-router";
export const useDesktopStore = defineStore("desktop", () => {
  const router = useRouter();
  const openAppInfo = ref({
    viewLeft: 0, // 窗口位置
    viewTop: 0, // 窗口位置
    isOpenApp: false, // 是否打开App
    openClass: "", // 打开App的动画
    appIcon: null, // 打开App的图标
  });
  function openApp(t) {
    if (t.appUrl) router.replace(t.appUrl);
    if (t.appIcon) openAppInfo.value.appIcon = t.appIcon;
    let btnXY = document.getElementById(t.id).getBoundingClientRect();
    openAppInfo.value.viewLeft = parseInt(btnXY.left) - 20;
    openAppInfo.value.viewTop = parseInt(btnXY.top) - 20;
    openAppInfo.value.isOpenApp = true;
    setTimeout(() => {
      openAppInfo.value.openClass = "open-app";
    });
  }
  function closeApp() {
    openAppInfo.value.openClass = "close-app";
    setTimeout(() => {
      openAppInfo.value.isOpenApp = false;
      openAppInfo.value.openClass = "";
      router.replace("/");
    }, 300);
  }
  return {
    openAppInfo,
    openApp,
    closeApp,
  };
});
