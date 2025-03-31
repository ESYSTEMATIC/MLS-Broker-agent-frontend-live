import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    profileData: {},
    verificationData: null,
    registrationData: {},
    pendingProfile: null,
  }),

  getters: {},

  actions: {
    
    setProfile(payload) {
      this.profileData = payload;
    },
    setVerificationData(payload) {
      this.verificationData = payload;
    },
    setRegistrationData(payload) {
      this.registrationData = payload;
    },
    setPendingProfile(payload) {
      this.pendingProfile = payload;
    },
  },
});
