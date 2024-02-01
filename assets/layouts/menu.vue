<template>
  <v-toolbar class="navbar" density="comfortable" :elevation="8" title="Cocktails">
    <v-toolbar-items>
      <NuxtLink to="/"><v-btn color="amber-darken-1">Home page</v-btn></NuxtLink>
      <NuxtLink to="/create_cocktail"><v-btn color="amber-darken-1">Create Coctail</v-btn></NuxtLink>
      <NuxtLink to="/favourites"><v-btn color="amber-darken-1">My favourites</v-btn></NuxtLink>
    </v-toolbar-items>

    <v-divider vertical class="mx-0"></v-divider>
    <NuxtLink class="log-in" to="/authentication/registration"><v-btn color="amber-darken-1" icon="mdi-account"></v-btn></NuxtLink>
    <v-divider vertical class="mx-0"></v-divider>
    <v-btn @click="handleLogOut" color="amber-darken-1">Log Out</v-btn>
    <log-out-modal @accept="handleAccept" :is-opened="logOutIsVisible" />
  </v-toolbar>
</template>

<script>
import LogOutModal from "@/assets/components/LogOutModal.vue"
export default {
    name: 'MenuBar',
    components: { LogOutModal },
    data(){
        return {
            logOutIsVisible: false
        }
    },
    methods: {
        handleLogOut() {
            this.logOutIsVisible = !this.logOutIsVisible;
        },
        handleAccept(bool) {
            console.log(bool, 'bool')
            this.logOutIsVisible = bool;
        },
    }
};
</script>

<style lang="scss" scoped>
.log-in {
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.navbar {
    position: sticky;
    top: 0;
    z-index: 999;
    border-bottom: 1px solid rgb(255, 179, 0);
    box-shadow: 4px 7px 10px white !important;
}
.router-link-active {
    background-color: #78909C;
}
a {
    display: flex;
    text-decoration: unset;
}
</style>
