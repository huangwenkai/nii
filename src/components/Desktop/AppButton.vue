<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="app-btn" >
    <img :src="icon" alt="app-icon"/>
  </div>
</template>
<style scoped lang="scss">
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
</style>
