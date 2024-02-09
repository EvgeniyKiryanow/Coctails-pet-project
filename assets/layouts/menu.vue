<template>
  <v-toolbar
    class="navbar"
    density="comfortable"
    :elevation="8"
    title="Cocktails"
  >
    <v-toolbar-items>
      <NuxtLink to="/"
        ><v-btn color="amber-darken-1">Home page</v-btn></NuxtLink
      >
      <template v-if="hasAccessToken">
        <NuxtLink to="/create_cocktail"
          ><v-btn color="amber-darken-1">Create Coctail</v-btn></NuxtLink
        >
        <NuxtLink to="/favourites"
          ><v-btn color="amber-darken-1">My favourites</v-btn></NuxtLink
        >
      </template>
    </v-toolbar-items>

    <v-divider vertical class="mx-0"></v-divider>
    <template v-if="!hasAccessToken">
      <NuxtLink class="log-in" to="/authentication/registration"
        ><v-btn color="amber-darken-1" icon="mdi-account"></v-btn
      ></NuxtLink>
    </template>
    <v-divider vertical class="mx-0"></v-divider>
    <v-btn color="amber-darken-1" @click="handleLogOut">Log Out</v-btn>
    <log-out-modal :is-opened="logOutIsVisible" @accept="handleAccept" />
  </v-toolbar>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import LogOutModal from "@/assets/components/LogOutModal.vue";
import { useUserAuthDataStore } from "@/stores/auth"; // Import your Pinia store

export default {
  name: "MenuBar",
  components: { LogOutModal },
  setup() {
    const userAuthStore = useUserAuthDataStore(); // Access the Pinia store instance
    const router = useRouter();

    // Define computed property for hasAccessToken
    const hasAccessToken = computed(() => !!userAuthStore.user);

    // Define methods
    const handleLogOut = () => {
      userAuthStore.logOut(); // Call the logout action from your store
      router.push("/");
    };

    const handleAccept = (bool) => {
      console.log(bool, "bool");
      // Perform any additional actions as needed
    };

    return {
      hasAccessToken,
      handleLogOut,
      handleAccept,
    };
  },
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
  background-color: #78909c;
}
a {
  display: flex;
  text-decoration: unset;
}
</style>
