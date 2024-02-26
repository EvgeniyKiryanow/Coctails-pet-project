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
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
    logOut() {
      this.setUser(null);
    },
  },
});
// const handleRegister = async () => {
//     if (response) {
//       userAuthStore.setUser(response.user);
//       router.push("/favourites");
//     } else {
//       throw new Error("Registration failed");
//     }
//   } catch (error) {
//     console.error("Error during registration:", error);
//     alert("Registration failed. Please try again.");
//   } finally {
//     isRegistering.value = false;
//   }
// };
