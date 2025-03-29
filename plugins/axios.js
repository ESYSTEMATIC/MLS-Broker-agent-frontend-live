import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: nuxtApp.$config.public.baseURL,
    headers: {
      common: {
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "text",
        "Accept-Language": nuxtApp.$i18n.locales.value.find(
          (item) => item.code === nuxtApp.$i18n.locale.value,
        )?.iso,
        Lang: nuxtApp.$i18n.locale.value,
        Authorization: `Bearer ${localStorage.getItem("mls_egypt_token")}`,
      },
    },
    params: {},
  });

  const router = useRouter();
  const localePath = useLocalePath();

  function handleError(error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("mls_egypt_token");
      router.push(localePath("/"));
    }
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("mls_egypt_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      handleError(error);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      handleError(error);
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
