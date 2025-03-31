<template>
    <div>
      <div
        class="mb-6 rounded-2xl bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
      >
        <h3 class="mb-2 text-primary text-2xl font-bold leading-9">
          {{ $t("TITLES.reviews") }}
        </h3>
  
        <p class="">
          {{ $t("TITLES.your_reviews_requests") }}
        </p>
      </div>

      {{ data }}
  
      <div class="rounded-2xl light:bg-white card-shadow px-6 py-4">
        <div class="mb-6">
          <GlobalsBaseFilter :items="dataFilter">
          </GlobalsBaseFilter>
        </div>
    
        <div>
          <ProfileReviewsTable v-if="pending" loading :items="[]" />
    
          <ProfileReviewsTable v-else :items="[]" />
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  definePageMeta({
    layout: "profile",
  });
  
  const { t, locale, locales } = useI18n();
  
  useHead({
    title: t("TITLES.invoices"),
    meta: [
      {
        name: "description",
        content: t("TITLES.your_recent_invoices"),
      },
    ],
  });
  
  const route = useRoute();
  
  const dataFilter = [
    {
      name: "contacts",
      type: "search",
      key: "keyword",
      placeholder: t("LABELS.search") + " " + t("TITLES.reviews"),
    },
  ];
  
  const showType = ref("grid");
  
  /* Start of the function that fetch data */
  const token = localStorage.getItem("mls_egypt_token");
  
  const headers = {
    "Accept-Language": locales.value.find((item) => item.code === locale.value)
      ?.iso,
    Lang: locale.value,
    Authorization: `Bearer ${token}`,
  };
  
  const {
    public: { baseURL },
  } = useRuntimeConfig();
  
  function getDate(d) {
    let date = new Date();
  
    if (d) {
      date = new Date(d);
    }
  
    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    return `${fullYear}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  }
  
  const { data, pending } = await useAsyncData(
    "request-reviews",
    () => {
  
      return $fetch("/request-reviews", {
        baseURL,
        method: "GET",
        headers,
      }).catch((err) => {
        console.log(err);
      });
    },
    {
      transform: (res) => res.data.data,
      watch: [() => route.query],
    },
  );


  /* End of the function that fetch data */
  </script>
  
  <style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  