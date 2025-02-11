import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = useCookie("mls_egypt_token");

  const application_status = useCookie("application_status").value;
  const status = useCookie("status").value;

  if (token.value) {
    // if(status && application_status && !authStore.verificationData){
    //     return navigateTo("/");
    // }
    // if((to.fullPath.includes("/auth/status") || (application_status == "approved" &&
    //   status == "expired")) && !authStore.verificationData){
    //   return navigateTo("/");
    // }

    
    // if (
    //   application_status == "approved" &&
    //   status == "expired" &&
    //   to.fullPath !== "/auth/status" &&
    //   to.fullPath !== "/auth/registration"
    // ) {
    //   return navigateTo("/auth/status");
    // }
     if (
      application_status == "approved" &&
      status == "training" &&
      to.fullPath !== "/auth/registration"
    ) {
      return navigateTo("/auth/registration");
    } else if (
      !status &&
      !application_status &&
      !to.fullPath.includes("profile")
    ) {
      if (to.fullPath.includes("listing/listing-callback")) return;
      else return navigateTo("/profile");
    }
  } else {
    if (
      to.fullPath.includes("profile") ||
      to.fullPath.includes("/auth/registration") ||
      (to.fullPath.includes("update-application") &&
        !authStore.verificationData) ||
      (to.fullPath.includes("application-developer") &&
        !authStore.verificationData) ||
      (to.fullPath.includes("/auth/status") && !authStore.verificationData) ||
      to.fullPath.includes("listing/listing-callback")
    ) {
      return navigateTo("/");
    }
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
