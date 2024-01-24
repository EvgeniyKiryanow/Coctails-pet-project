<template>
  <div>
    <MenuBar class="menu" />
  </div>
</template>

<script>
import MenuBar from "@/assets/layouts/menu.vue";
export default {
  name: "MainView",
  components: { MenuBar },
};
</script>

<style lang="scss" scoped>
.menu {
    margin-bottom: 25px;
}
</style>
