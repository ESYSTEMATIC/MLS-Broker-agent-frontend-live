import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  timeout: 2000,
  theme: "colored",
  position: "top-center",
  pauseOnFocusLoss: false,
  draggable: true,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
