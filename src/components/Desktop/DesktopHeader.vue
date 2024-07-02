<script setup>
const system = useSystemsStore();
const route = useRoute();
</script>
<template>
  <header :class="{ show: route.path != '/' }">
    {{ route.push }}
    <div>
      <span class="header-li">{{ system.getDayJsTime().format("YYYY年M月D日 HH:mm:ss") }}</span>
      <span class="header-li">{{ system.getDay() }}</span>
    </div>
    <div class="flex-1"></div>
    <div></div>
  </header>
</template>
<style scoped lang="scss">
header {
  color: white;
  padding: 0 $layout_header_height;
  height: $layout_header_height;
  font-size: 13px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 900;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  transition: 0.3s;
  .header-li {
    margin: 0 5px;
  }
  .hover {
    cursor: pointer;
  }
}

.show {
  top: -$layout_header_height;
}
</style>
