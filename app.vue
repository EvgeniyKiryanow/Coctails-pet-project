<template>
  <div>
    <v-app>
      <MainMenu />
      <v-container fluid>
        <NuxtPage class="test" />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import MainMenu from "@/assets/layouts/menu.vue";

export default {
  name: "App",
  components: { MainMenu },
};
</script>

<style lang="scss" scoped>
.test {
  position: relative;
  z-index: 2;
}
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  // background-image: url('@/assets/img/background.webp');
  // background-size: cover;
  // background-position: center;
}
</style>
