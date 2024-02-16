import { defineStore } from "pinia";

interface User {
  name: string;
  accessToken: string;
  uid: string;
  email: string;
  id: string;
}

interface Auth {
  user: User | null;
}

export const useUserAuthDataStore = defineStore({
  id: "userAuthStore",
  state: (): Auth => ({
    user: null,
  }),
  getters: {
    getUserData: ($state) => $state.user,
    getUserToken: ($state) => $state.user?.accessToken,
  },
  actions: {
    setUser(user: User | null) {
      this.$state.user = user;
      if (user) {
        localStorage.setItem("accessToken", user.accessToken);
        console.log("here");
      } else {
        localStorage.removeItem("accessToken");
      }
    },
    loadUserFromLocalStorage() {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const mockUser: User = {
          name: "User Name",
          accessToken,
          uid: "mock-uid",
          email: "user@example.com",
          id: "Udmsdf2kcms",
        };
        this.setUser(mockUser);
      }
    },
    logOut() {
      this.setUser(null);
    },
  },
});
