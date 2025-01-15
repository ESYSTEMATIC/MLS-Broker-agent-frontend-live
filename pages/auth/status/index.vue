<template>
  <div
    class="absolute start-0 top-0 flex h-screen w-full items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="md-4">
        <img
          :src="
            data.application_status == 'pending'
              ? '/icons/waiting.svg'
              : data.application_status == 'approved' && '/icons/approved.svg'
          "
          alt="icon-waiting"
        />
      </div>

      <div class="mb-8">
        <h2 class="mb-1 text-center text-2xl font-bold">
          {{
            data?.application_status == "pending"
              ? $t("TITLES.waitingForApproval")
              : data.application_status == "approved" &&
                $t("TITLES.approvedSuccessfully")
          }}
        </h2>

        <p class="text-center text-lg text-[#6D6E76]">
          {{
            data?.application_status == "pending"
              ? $t("TITLES.we_are_reviewing_your_account")
              : data?.application_status == "approved" &&
                $t("TITLES.we_reviewed")
          }}
        </p>
      </div>

      <div>
        <button
          @click="$router.push(localePath('/auth/registration'))"
          type="button"
          :disabled="data.application_status == 'pending'"
          class="w-[450px] rounded-full bg-[#CE1127] py-3 font-medium text-white disabled:bg-[#5C5C5C1A] disabled:text-[#5A5A5A]"
        >
          {{ $t("BUTTONS.proceed") }}
          <font-awesome-icon
            :icon="`fa-solid fa-arrow-${locale == 'en' ? 'right' : 'left'}`"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "pending",
});
const { locale } = useI18n();
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();

const data = ref({});

if (authStore.verificationData) {
  data.value = authStore.verificationData;
} else if (useCookie("application_status").value) {
  data.value = {
    application_status: useCookie("application_status").value,
  };
}
</script>

<style lang="scss" scoped></style>
