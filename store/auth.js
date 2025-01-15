import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    profileData: {},
    verificationData: null,
    registrationData: {},
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
  },
});
