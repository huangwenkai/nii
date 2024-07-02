<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  appName: {
    type: String,
    default: "",
  },
  isShowName: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="app-btn-box">
    <div class="app-btn">
      <img :src="icon" alt="app-icon" />
    </div>
    <div v-if="isShowName" class="app-name">{{ appName }}</div>
  </div>
</template>
<style scoped lang="scss">
.app-btn-box {
  display: inline-block;

  .app-btn {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.3s;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(0.9);
    }
  }

  .app-name {
    font-size: 13px;
    padding-top: 5px;
    text-align: center;
    color: white;
    font-weight: 400;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
}
</style>
