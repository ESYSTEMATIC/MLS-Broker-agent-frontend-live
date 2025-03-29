<script setup>
import { useDark, useToggle } from "@vueuse/core";
import axios from "axios";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { onMounted, ref } from "vue";
const isDark = useDark();
const authStore = useAuthStore()
const toggleTheme = useToggle(isDark);
const {push , currentRoute} = useRouter()
const isLoading = ref(false)
const toast = useToast()
const {t , locales , locale} = useI18n();
const currentStep = ref('appFees')

useHead({
  title: t("BUTTONS.login"),
  script: [
    {
      src: "https://www.merchant.geidea.net/hpp/geideaCheckout.min.js",
    },
  ],
});

const {
  public: { baseURL },
} = useRuntimeConfig();

const headers = {
  "Accept-Language": locales.value.find(
    (item) => item.code === locale.value,
  )?.iso,
  "Content-Type": "application/json",
  Accept: "application/json",
  Lang: locale.value,
};


definePageMeta({
  layout: "pending",
});

onMounted(() => {
    if(!authStore.pendingProfile){
        push('/auth/login')
        return
    }  
    if(authStore.pendingProfile.app_paid && !authStore.pendingProfile.approved){
        currentStep.value = 'pendingApproval'
    }
    if(authStore.pendingProfile.approved && !authStore.pendingProfile.package_pay){
        currentStep.value = 'pacakageFees'
    }
})


const payApplicationFees = async () => {
  isLoading.value = true
  headers.Authorization = `Bearer ${authStore.pendingProfile.token}`;
  await $fetch('/payment/application', {
      method: "GET",
      baseURL,
      headers,
    })
    .then((res) => {
      console.log(res);
      isLoading.value = false
      startAppFeesPayment(res.data.session_id)
    })
    .catch((e) => {
      console.error(e);
      isLoading.value = false
      toast.error(e.response.data.message);
    });
}

const payPackageFees = async () => {
  headers.Authorization = `Bearer ${authStore.pendingProfile.token}`;
  await $fetch('/payment/submitPackage', {
    method: "GET",
    baseURL,
    headers,
  })
  .then((res) => {
    console.log(res);
    isLoading.value = false
    startPackagePayment(res.data.session_id)
  })
  .catch((e) => {
    console.error(e);
    isLoading.value = false
    toast.error(e.response.data.message);
  });
}

async function onAppFeesPaymentSuccess() {
  isLoading.value = true;
  toast.success(t("TEXTS.paymentSuccess"));
  currentStep.value = 'pendingApproval'
//   location.reload()
}

async function onPacakagePaymentSuccess() {
  isLoading.value = true;
  toast.success(t("TEXTS.paymentSuccess"));
  push('/')
}

function onPaymentError() {
  return toast.success(t("TEXTS.paymentFailed"));
}
/* End of the function that handle the error of the payment */

/* Start of the function that handle the cancellation of the payment */
function onPaymentCancel() {
  return toast.success(t("TEXTS.paymentCancelled"));
}

function startAppFeesPayment(sessionId) {
  const payment = new GeideaCheckout(
    onAppFeesPaymentSuccess,
    onPaymentError,
    onPaymentCancel,
  );
  payment.startPayment(sessionId);
}
function startPackagePayment(sessionId) {
  const payment = new GeideaCheckout(
    onPacakagePaymentSuccess,
    onPaymentError,
    onPaymentCancel,
  );
  payment.startPayment(sessionId);
}
</script>
<template>
    <div class="flex size-full h-[80vh] items-center justify-center p-3">
        <div class="w-full rounded-xl border border-transparent bg-white p-8 lg:w-[800px] shadow-[0,0,32px,0_#00000026] dark:border-black dark:bg-[#00000080]">
            <!-- <div class="max-h-[90vh] overflow-y-auto px-5 pb-3">
                <div
                class="mb-5 flex flex-wrap items-start justify-between gap-5 pt-3 md:items-center"
                :class="step === 'email' && 'lg:mb-10'"
                >
                <SvgIcon v-if="isDark" icon="dark" class="block h-[60px]" />
                <SvgIcon v-else icon="light" class="block h-[60px]" />
        
                <button
                    type="button"
                    class="flex size-[50px] items-center justify-center rounded-full border-2 border-light-border dark:border-dark-border"
                    @click="toggleTheme()"
                >
                    <SvgIcon icon="moon" />
                </button>
                </div>
            </div> -->
            <div v-if="currentStep === 'appFees'" class="flex items-center justify-center flex-col">
                <img class="w-[130px]" :style="isDark ? 'filter : invert(1);' : ''" src="/globals/2644191-200.png" alt="">
                <p class="text-center px-3 dark:text-white my-3">{{ $t('TEXTS.appFeesPending') }}</p>
                <GlobalsButton class="h-[53px] flex-1 !rounded-[36px] p-3 px-5 border border-transparent bg-[#CE11271A] font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
                :text="$t('BUTTONS.payAppFees')"
                :loading="isLoading" 
                @click="payApplicationFees"
              />
            </div>
            <div v-if="currentStep == 'pendingApproval'" class="flex items-center justify-center flex-col">
                <img class="w-[200px]" src="/globals/pngtree-pending-review-stamp-check-picture-image_13053786.png" alt="">
                <p class="text-center px-4 dark:text-white my-2">{{ $t('TEXTS.pendingApproval') }}</p>
            </div>
            <div v-if="currentStep == 'pacakageFees'"  class="flex items-center justify-center flex-col">
                <img class="w-[150px]" :style="isDark ? 'filter : invert(1);' : ''" src="/globals/onboarding.png" alt="">
                <h1 class="text-center text-xl font-semibold px-4 dark:text-white my-2">{{ $t('TITLES.packageFees') }}</h1>
                <p class="text-center px-4 dark:text-white my-2">{{ $t('TEXTS.packageFees') }}</p>
                <GlobalsButton class="h-[53px] flex-1 !rounded-[36px] p-3 px-5 border border-transparent bg-[#CE11271A] font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
                :text="$t('BUTTONS.payAppFees')" :loading="isLoading" @click="payPackageFees"
              />
            </div>
        </div>
    </div>
</template>