export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      if (
        to.path !== "/" &&
        to.path !== "/authentication/registration" &&
        to.path !== "/authentication/log_in"
      ) {
        return navigateTo("/");
      }
    } else {
      to.meta.hasAccessToken = true;
    }
  }
});
