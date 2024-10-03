import { defineStore } from "pinia";
import { useFirebaseAuth } from "../composables/useFirebaseAuth";

export const useUserAuthDataStore = defineStore({
  id: "userAuthStore",
  state: () => ({
    user: null,
    authenticated: false,
    loading: false,
  }),
  getters: {
    getUserData: ($state) => $state.user,
    getUserToken: ($state) => $state.user?.accessToken,
  },
  actions: {
    setUser(user) {
      this.$state.user = user;
      if (user) {
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("uid", user.uid);
        console.log("here");
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("uid");
      }
    },
    async registrateUser({ email, password }) {
      const { registerUser } = useFirebaseAuth();
      const response = await registerUser(email, password);
      this.setUserData(response);
      this.loading = false;
      if (response) {
        this.setUserData(response);
      }
    },
    async authenticateUser({ email, password }) {
      const { authenticateUser } = useFirebaseAuth();
      const response = await authenticateUser(email, password);
      this.setUserData(response);
      this.loading = false;
      if (response) {
        this.setUserData(response);
      }
    },
    setUserData(response) {
      this.loading = false;
      if (response) {
        this.$state.user = response.user;
        this.setUser(response.user);
        const token = useCookie("token");
        token.value = response?.user?.accessToken;
        this.authenticated = true;
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
    logOut() {
      this.setUser(null);
    },
  },
});
