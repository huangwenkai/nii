import GestureJs from "@/utils/gesture";
import dayjs from "dayjs";
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

    gt = new GestureJs();
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

  // 获取dayjs系统时间
  function getDayJsTime() {
    return dayjs(systemsData.value.time);
  }

  // 获取星期几
  function getDay() {
    let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return days[getDayJsTime().day()];
  }

  systemsInit();

  return {
    systemsData,
    setSystemsData,
    systemsInit,
    setGtEvents,
    getDayJsTime,
    getDay,
  };
});
