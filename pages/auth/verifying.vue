<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
  layout: "auth",
  validate: (data) => {
    return data.query.verify_code ? true : false;
  },
});

const localePath = useLocalePath();

const i18n = useI18n();

const toast = useToast();

const route = useRoute();

const {
  public: { baseURL },
} = useRuntimeConfig();

const headers = {
  "Accept-Language": i18n.locales.value.find(
    (item) => item.code === i18n.locale.value,
  )?.iso,
  Lang: i18n.locale.value,
};

const status = ref(null);
async function checkCode() {
  await $fetch("/verify-company", {
    params: {
      verify_code: route.query.verify_code,
    },
    headers,
    baseURL,
  })
    .then((res) => {
      status.value = "success";
    })
    .catch((e) => {
      toast.error(i18n.t("TEXTS.accountNotVerified"));

      status.value = "error";
    });
}

onMounted(() => {
  checkCode();
});
</script>

<template>
  <div
    class="relative mx-auto flex max-h-[95vh] w-full flex-col items-center justify-center gap-5 overflow-y-auto overflow-x-hidden rounded-[24px] border border-transparent bg-white p-3 dark:border-[#1C1C21] dark:bg-[#0B0909] md:p-7 lg:w-[700px]"
  >
    <img
      src="/globals/modal/email-confirmation.svg"
      class="size-[90px]"
      alt="email-confirmation-image"
      :draggable="false"
    />

    <h5 class="mb-3 text-sm font-medium xl:text-xl">
      <template v-if="status">
        <template v-if="status === 'success'">
          Your company information has been registered with us. We will review
          it and keep you updated.
        </template>

        <template v-if="status === 'error'">
          Error! something went wrong. Please try again.
        </template>
      </template>

      <template v-else>
        {{ $t("TEXTS.verifyingYourEmail") }}
      </template>
    </h5>

    <NuxtLink :to="localePath('/')" class="text-primary underline">{{
      $t("BUTTONS.backToHome")
    }}</NuxtLink>
  </div>
</template>
