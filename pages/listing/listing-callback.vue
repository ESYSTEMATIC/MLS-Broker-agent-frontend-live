<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
  layout: "listing",
  validate: (data) => {
    return data.query.token ? true : false;
  },
});

const i18n = useI18n();

const toast = useToast();

useHead({
  title: i18n.t("TITLES.listingCallback"),
  script: [
    {
      src: "https://www.merchant.geidea.net/hpp/geideaCheckout.min.js",
    },
  ],
});

const { locales, locale } = useI18n();

const token = useCookie("mls_egypt_token");

const headers = {
  "Accept-Language": locales.value.find((item) => item.code === locale.value)
    ?.iso,
  Lang: locale.value,
  Authorization: `Bearer ${token.value}`,
};

const {
  public: { baseURL },
} = useRuntimeConfig();

const route = useRoute();

/* Start of the function that call the payment gateway */
function startPayment() {
  const payment = new GeideaCheckout(
    onPaymentSuccess,
    onPaymentError,
    onPaymentCancel,
  );

  payment.startPayment(paymentTransaction.value.session_id);
}
/* End of the function that call the payment gateway */

/* Start of the function that handle the success of the payment */
async function onPaymentSuccess() {
  $fetch("/payment/paymentComplete", {
    baseURL,
    headers,
    body: {
      id: paymentTransaction.value.id,
      order: {
        status: "Success",
        merchantReferenceId: paymentTransaction.value.success_indicator,
      },
    },
    method: "POST",
  })
    .then(() => {
      toast.success(t("TEXTS.paidSuccessfully"));

      listingCallback();
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (paymentTransaction.value = null));
}
/* End of the function that handle the success of the payment */

/* Start of the function that handle the error of the payment */
async function onPaymentError() {
  $fetch("/payment/paymentRejected", {
    baseURL,
    headers,
    body: {
      id: paymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(t("TEXTS.paymentFailed")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (paymentTransaction.value = null));
}
/* End of the function that handle the error of the payment */

/* Start of the function that handle the cancellation of the payment */
async function onPaymentCancel() {
  $fetch("/payment/paymentCanceled", {
    baseURL,
    headers,
    body: {
      id: paymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(t("TEXTS.paymentCancelled")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (paymentTransaction.value = null));
}
/* End of the function that handle the cancellation of the payment */

/* Start of the function that listing callback url */
const paymentTransaction = ref(null);

async function listingCallback() {
  await $fetch("/listing/submit", {
    baseURL,
    headers,
    method: "POST",
    body: {
      listing_token: route.query.token,
    },
  })
    .then((res) => {
      const data = res.data;

      if (data.url) {
        location.href = res.data.url;
      } else {
        paymentTransaction.value = data.payment_transaction;

        startPayment();
      }
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    });
}
/* End of the function that listing callback url */

onMounted(() => {
  if (route.query.token) {
    listingCallback();
  }
});
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="container flex h-full items-center justify-center">
      <GlobalsLoader />
    </div>
  </div>
</template>
