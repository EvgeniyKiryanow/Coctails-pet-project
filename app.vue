<template>
  <div>
    <v-app>
      <Main />
      <NuxtPage />
    </v-app>
  </div>
</template>

<script>
import Main from "@/assets/views/main.vue";
export default {
  name: "App",
  components: { Main },
};
</script>
