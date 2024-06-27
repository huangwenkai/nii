<script setup>
import dayjs from "dayjs";
const system = useSystemsStore();
function getDayJsTime() {
  return dayjs(system.systemsData.time);
}
function getDay() {
  let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  return days[getDayJsTime().day()];
}
const { openAppInfo, openApp } = useDesktopStore();
</script>
<template>
  <header>
    <div>
      <span class="header-li">{{ getDayJsTime().format("YYYY年M月D日") }}</span>
      <span class="header-li">{{ getDay() }}</span>
    </div>
    <div class="flex-1"></div>
    <div></div>
  </header>
</template>
<style scoped lang="scss">
header {
  color: white;
  padding: 0 30px;
  height: $layout_header_height;
  font-size: 13px;
  width: 100%;
  position: relative;
  z-index: 900;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  .header-li {
    margin: 0 5px;
  }
  .hover {
    cursor: pointer;
  }
}
</style>
