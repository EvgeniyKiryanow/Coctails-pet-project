import { defineStore } from "pinia";

interface User {
  name: string;
  accessToken: string;
  uid: string;
  email: string;
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
    getUserData: ({ user }) => user,
    getUserToken: ({ user }) => user?.accessToken,
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;
      if (user) {
        // Save accessToken to localStorage when user is set
        localStorage.setItem('accessToken', user.accessToken);
        console.log('here')
      } else {
        // Clear accessToken from localStorage when user is null
        localStorage.removeItem('accessToken');
      }
    },
    loadUserFromLocalStorage() {
      // Load user data from localStorage when app starts
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // If accessToken is found, create a mock user object with it
        const mockUser: User = {
          name: 'User Name', // You might want to retrieve this from localStorage as well
          accessToken,
          uid: 'mock-uid', // You might want to retrieve this from localStorage as well
          email: 'user@example.com' // You might want to retrieve this from localStorage as well
        };
        this.setUser(mockUser);
      }
    },
  },
});
