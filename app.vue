<template>
  <div>
    <v-app>
      <MainMenu />
      <NuxtPage />
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
