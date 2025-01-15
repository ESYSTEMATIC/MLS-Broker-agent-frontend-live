// plugins/vue-signature.client.js

import Vue3Signature from 'vue3-signature';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Signature);
});
