export const useSystemsStore = defineStore("systems", () => {
  let timeSI;
  // 系统数据
  const systemsData = ref({
    token: null, // 登录凭证
    time: new Date(), // 系统时间
    user: {
      // 用户信息
      id: "",
      account: "",
      avatar: "",
      email: "",
    },
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
  }

  // 设置系统数据
  function setSystemsData(data) {
    systemsData.value = { ...systemsData.value, ...data };
  }

  systemsInit();

  return {
    systemsData,
    setSystemsData,
    systemsInit,
  };
});
