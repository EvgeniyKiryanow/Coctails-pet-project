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
    getUserData: ($state) => $state.user, // Используем $state вместо state
    getUserToken: ($state) => $state.user?.accessToken, // Используем $state вместо state
  },
  actions: {
    setUser(user: User | null) {
      this.$state.user = user; // Используем $state вместо state
      if (user) {
        // Сохраняем accessToken в localStorage при установке пользователя
        localStorage.setItem('accessToken', user.accessToken);
        console.log('here')
      } else {
        // Удаляем accessToken из localStorage при установке пользователя в null
        localStorage.removeItem('accessToken');
      }
    },
    loadUserFromLocalStorage() {
      // Загружаем данные пользователя из localStorage при запуске приложения
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // Если accessToken найден, создаем фиктивный объект пользователя с его помощью
        const mockUser: User = {
          name: 'User Name', // Вы можете также получить это из localStorage
          accessToken,
          uid: 'mock-uid', // Вы можете также получить это из localStorage
          email: 'user@example.com' // Вы можете также получить это из localStorage
        };
        this.setUser(mockUser);
      }
    },
    logOut() {
      // Очищаем данные пользователя при выходе
      this.setUser(null);
    }
  },
});
