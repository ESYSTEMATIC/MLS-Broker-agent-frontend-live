import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem('mls_egypt_token')
  
  if(token && to.fullPath.includes("auth")){
    return navigateTo("/profile");
  }
  if(to.fullPath.includes("auth/pending") && !authStore.pendingProfile){
    return navigateTo("/auth/login");
  }
  if((to.fullPath.includes("auth/update-application") || to.fullPath.includes("auth/application-developer")) && !authStore.verificationData){
    return navigateTo("/auth/login");
  }
  if (!token && !to.fullPath.includes("auth")) {
    return navigateTo("/auth/login");
  }

  if (process.client) {
    if (localStorage.getItem("profileData")) {
      const profileData = JSON.parse(localStorage.getItem("profileData"));

      if (!Object.keys(authStore.profileData).length && profileData) {
        authStore.setProfile(profileData);
      }
    }
  }
});
