import GestureJs from "@/utils/gesture";
export const useSystemsStore = defineStore("systems", () => {
  // 定时器 1秒一次 更新时间
  let timeSI;
  // 手势监控
  let gt;
  // 系统数据
  const systemsData = ref({
    isOpenWait: false, // 是否打开待机页面
    token: null, // 登录凭证
    time: new Date(), // 系统时间
    user: {
      // 用户信息
      id: "",
      account: "",
      avatar: "",
      email: "",
    },
    // 取缓存
    ...JSON.parse(localStorage.getItem("SYSTEMS_DATA") || "{}"),
  });

  // 系统初始化
  function systemsInit() {
    if (timeSI) {
      clearInterval(timeSI);
      timeSI = null;
    }
    timeSI = setInterval(() => {
      systemsData.value.time = new Date();
    }, 1000);

    gt = new GestureJs({
      events: {
        upwardSliding(offset) {
          console.log("上滑了:", offset);
        },
        downwardSliding(offset) {
          console.log("下滑了:", offset);
        },
        leftSliding(offset) {
          console.log("左滑了:", offset);
        },
        rightSliding(offset) {
          console.log("右滑了:", offset);
        },
        upwardScroll() {
          console.log("鼠标滚动向上");
        },
        downwardScroll() {
          console.log("鼠标滚动向下");
        },
        // _pinchZoom(zoomType) {
        //   if (zoomType == "enlarge") {
        //     console.log("放大");
        //   }
        //   if (zoomType == "narrow") {
        //     console.log("缩小");
        //   }
        // },
      },
    });
  }

  // 设置系统数据
  function setSystemsData(data) {
    systemsData.value = { ...systemsData.value, ...data };
    localStorage.setItem("SYSTEMS_DATA", JSON.stringify(systemsData.value));
  }

  // 设置手势事件
  function setGtEvents(events) {
    gt.setEvents(events);
  }

  systemsInit();

  return {
    systemsData,
    setSystemsData,
    systemsInit,
    setGtEvents,
  };
});
