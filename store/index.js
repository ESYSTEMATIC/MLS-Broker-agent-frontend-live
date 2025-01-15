import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    isMedium: false,
    isHovered: false,
    isShown: true,
    isSmall: false,
    // =================================================================
    countries: [
      {
        id: 1,
        title: "egypt",
        phone_code: "20",
        phone_limit: "10",
        flag: "/auth/egypt.png",
      },
      {
        id: 2,
        title: "united arab emirates",
        phone_code: "971",
        phone_limit: "9",
        flag: "/auth/united-arab-emirates.png",
      },
      {
        id: 3,
        title: "saudi arabia",
        phone_code: "966",
        phone_limit: "9",
        flag: "/auth/saudi-arabia.png",
      },
      {
        id: 4,
        title: "qatar",
        phone_code: "974",
        phone_limit: "8",
        flag: "/auth/qatar.png",
      },
      {
        id: 5,
        title: "kuwait",
        phone_code: "965",
        phone_limit: "8",
        flag: "/auth/kuwait.png",
      },
      {
        id: 6,
        title: "bahrain",
        phone_code: "973",
        phone_limit: "8",
        flag: "/auth/bahrain.png",
      },
    ],
  }),

  getters: {},

  actions: {
    setIsMedium(payload) {
      this.isMedium = payload;
    },
    setIsHovered(payload) {
      this.isHovered = payload;
    },
    setIsSmall(payload) {
      this.isSmall = payload;
    },
    setIsShown(payload) {
      this.isShown = payload;
    },

    englishToArabicNumerals(number) {
      const arabicNumerals = {
        0: "٠",
        1: "١",
        2: "٢",
        3: "٣",
        4: "٤",
        5: "٥",
        6: "٦",
        7: "٧",
        8: "٨",
        9: "٩",
      };

      return number
        .toString()
        .split("")
        .map((char) => arabicNumerals[char] || char)
        .join("");
    },
  },
});
