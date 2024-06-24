<script setup>
const system = useSystemsStore();
</script>
<template>
  <main @click="system.setSystemsData({ token: !system.systemsData.token })"></main>
</template>
<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
}
</style>
