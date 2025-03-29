<template>
  <div>
    <div
      class="mb-6 flex flex-wrap items-center justify-between rounded-2xl light:bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
    >
      <div>
        <h3 class="mb-2 text-primary text-2xl font-bold leading-9">
          {{ $t("TITLES.membership_renewal") }}
        </h3>

        <p class="flex flex-wrap items-center gap-2">
          <span>{{ $t("TITLES.expiration_date") }}:</span>
          <span>{{
            profileData &&
            new Date(profileData.expiration_date).toLocaleDateString(
              $i18n.locale === "ar"
                ? `${$i18n.locale}-GB`
                : `${$i18n.locale}-EG`,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            )
          }}</span>
        </p>
      </div>

      <div class="mx-auto mt-2 md:mx-0 md:mt-0">
        <button
          disabled
          type="button"
          class="h-12 min-w-[220px] rounded-full bg-[#CE11270D] font-medium text-primary transition-all disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A]"
        >
          {{ $t("TITLES.renew_member_ship_title") }}
        </button>
      </div>
    </div>

    <div class="rounded-2xl light:bg-white card-shadow px-6 py-4 min-h-[50vh]">
      <div class="mb-6">
        <GlobalsBaseFilter :items="dataFilter"> </GlobalsBaseFilter>
      </div>
  
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="pending">
          <ProfileMembershipCard v-for="i in 15" :key="i" loading="" :card="{}" />
        </template>
  
        <ProfileMembershipCard
          v-else-if="data?.length"
          v-for="(item, i) in data"
          :key="i"
          :card="item"
        />
  
        <p
          v-else
          class="col-span-12 mt-2 text-center text-text-light dark:text-text-dark"
        >
          {{ $t("TEXTS.noMemberships") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "profile",
});

const { t, locale, locales } = useI18n();

useHead({
  title: t("TITLES.membership_renewal"),
  meta: [{}],
});

const route = useRoute();

const dataFilter = [
  {
    name: "date_from",
    type: "date",
    key: "start_date",
    placeholder: t("LABELS.date_from"),
  },
  {
    name: "date_to",
    type: "date",
    key: "end_date",
    placeholder: t("LABELS.date_to"),
  },
];

/* Profile data */
const authStore = useAuthStore();
const { profileData } = storeToRefs(authStore);
/* End of the profile data */

/* Start of the function that fetch data */
const token = localStorage.getItem("mls_egypt_token");

const headers = {
  "Accept-Language": locales.value.find((item) => item.code === locale.value)
    ?.iso,
  Lang: locale.value,
  Authorization: `Bearer ${token.value}`,
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

const axios = useNuxtApp().$axios;

const { data, pending } = await useAsyncData(
  "membership",
  () => {
    const payment_transactions = {
      purchase_type: "token",
      operator: "and",
      payment_status: "approved",
    };

    if (route.query.start_date || route.query.end_date) {
      payment_transactions["created_at"] = {};

      if (route.query.start_date) {
        payment_transactions["created_at"]["from"] = getDate(
          route.query.start_date,
        );

        payment_transactions["created_at"]["to"] = route.query.end_date
          ? getDate(route.query.end_date)
          : getDate();
      } else {
        payment_transactions["created_at"]["from"] = payment_transactions[
          "created_at"
        ]["to"] = getDate(route.query.end_date);
      }
    }

    return axios.post("/membership/packages/getByFilter", {
      page: 1,
      related_objects: [],
      related_objects_count: [],
      page_size: 999,
      filters: {
        payment_transactions,
      },
    });
  },
  {
    watch: [() => route.query],
    transform: (res) => res.data.data.package.data,
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
