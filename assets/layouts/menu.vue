<template>
  <v-toolbar density="comfortable" :elevation="8" title="Coctails">
    <v-toolbar-items>
      <NuxtLink to="/"><v-btn color="amber-darken-1">Home page</v-btn></NuxtLink>
      <NuxtLink to="/createCocktail"><v-btn color="amber-darken-1">Create Coctail</v-btn></NuxtLink>
      <NuxtLink to="/favourites"><v-btn color="amber-darken-1">My favourites</v-btn></NuxtLink>
    </v-toolbar-items>

    <v-divider vertical class="mx-1"></v-divider>
    <NuxtLink to="/registration"><v-btn color="amber-darken-1" icon="mdi-account"></v-btn></NuxtLink>
  </v-toolbar>
</template>

<script>
export default {
    name: 'MenuBar'
};
</script>

<style lang="scss" scoped>
.router-link-active {
    background-color: #78909C;
}
a {
    display: flex;
    text-decoration: unset;
}
</style>
