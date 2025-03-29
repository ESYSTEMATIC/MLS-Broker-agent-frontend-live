<template>
  <div>
    <!-- Start of the buy token model -->
    <Teleport to="body">
      <GlobalsModal
        v-if="openTokensModal"
        special
        :disabled="buyTokenLoading"
        @close="
          () => {
            if (!buyTokenLoading) {
              openTokensModal = false;
            }
          }
        "
      >
        <div class="flex items-center gap-3">
          <div
            class="flex size-[60px] items-center justify-center rounded-lg bg-[#CE112714]"
          >
            <img src="/globals/icons/token.svg" :draggable="false" />
          </div>

          <div class="flex flex-col items-start gap-2">
            <h3 class="font-semibold xl:text-lg">
              {{ $t("TITLES.buyTokens") }}
            </h3>

            <p class="font-medium text-text-light">
              {{ $t("TEXTS.howManyTokenYouNeed") }}
            </p>
          </div>
        </div>

        <div
          class="my-5 flex items-center justify-center gap-5 border-y border-[#F3F4F4] py-7"
        >
          <button
            type="button"
            class="flex h-[43px] w-[70px] items-center justify-center rounded-3xl bg-[#CE112712] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="tokenQuantity === 1"
            @click="
              () => {
                if (tokenQuantity > 1) {
                  tokenQuantity--;
                }
              }
            "
          >
            <img
              src="/public/globals/icons/minus.svg"
              alt="minus-image"
              :draggable="false"
            />
          </button>

          <input
            type="number"
            min="1"
            class="min-w-[25px] max-w-[100px] bg-transparent text-center font-medium"
            :placeholder="$t('INPUTS.enterTokenQuantity')"
            v-model="tokenQuantity"
          />

          <button
            type="button"
            class="flex h-[43px] w-[70px] items-center justify-center rounded-3xl bg-[#CE112712]"
            @click="tokenQuantity++"
          >
            <img
              src="/public/globals/icons/plus.svg"
              alt="plus-image"
              :draggable="false"
            />
          </button>
        </div>

        <div class="mb-3 flex items-center justify-between">
          <h5 class="font-medium xl:text-lg">
            {{ $t("TITLES.pricePerToken") }}
          </h5>

          <span>{{ price.price }} {{ $t("TITLES.AED") }}</span>
        </div>

        <div class="mb-5 flex items-center justify-between">
          <h5 class="font-medium xl:text-lg">
            {{ $t("TITLES.total") }}
          </h5>

          <span>{{ price.price * tokenQuantity }} {{ $t("TITLES.AED") }}</span>
        </div>

        <div class="flex items-center gap-5">
          <GlobalsButton
            type="button"
            class="h-[53px] flex-1 !rounded-[28px] border border-error font-semibold text-error duration-300 disabled:cursor-not-allowed disabled:opacity-60 [&:not(:disabled)]:hover:bg-error [&:not(:disabled)]:hover:text-white"
            :text="$t('BUTTONS.cancel')"
            :disabled="buyTokenLoading"
            @handleClick="openTokensModal = false"
          />

          <GlobalsButton
            type="button"
            class="h-[53px] flex-1 !rounded-[28px] border border-transparent bg-[#CE11271A] font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
            :text="$t('BUTTONS.buyNow')"
            :disabled="buyTokenLoading"
            @click="handleBuyToken"
          />
        </div>
      </GlobalsModal>
    </Teleport>
    <!-- End of the buy token model -->

    <div
      class="mb-6 flex flex-wrap items-center justify-between rounded-2xl light:bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
    >
      <div>
        <h3 class="mb-2 text-primary text-2xl font-bold leading-9">
          {{ $t("TITLES.listing_token") }}
        </h3>

        <p class="flex flex-wrap items-center gap-2">
          <span>{{ $t("TITLES.token_balance") }}:</span>

          <span>{{ balance ? balance.qty : 0 }}</span>
        </p>
      </div>

      <div class="mx-auto mt-2 md:mx-0 md:mt-0">
        <button
          @click="openTokensModal = true"
          type="button"
          class="h-12 min-w-[140px] rounded-full bg-[#CE11270D] font-medium text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary"
          :disabled="pricePending"
        >
          {{ $t("TITLES.buy_tokens") }}
        </button>
      </div>
    </div>

    <div class="rounded-2xl light:bg-white card-shadow px-6 py-4 min-h-[50vh]">
      <div class="mb-6">
        <GlobalsBaseFilter :items="dataFilter" />
      </div>
  
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="pending">
          <ProfileTokensCard v-for="i in 15" :key="i" :card="{}" loading />
        </template>
  
        <ProfileTokensCard
          v-else-if="data?.length"
          v-for="(item, i) in data"
          :key="i"
          :card="item"
        />
  
        <p v-else class="col-span-12 text-center">
          {{ $t("TEXTS.noListingTokens") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

definePageMeta({
  layout: "profile",
});

const { t, locales, locale } = useI18n();

useHead({
  title: t("TITLES.listing_token"),
  script: [
    {
      src: "https://www.merchant.geidea.net/hpp/geideaCheckout.min.js",
    },
  ],
});

const route = useRoute();

const toast = useToast();

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

/* Start of the function that handle buy token */
const openTokensModal = ref(false);

const tokenQuantity = ref(1);

watch(openTokensModal, (value) => {
  if (!value) {
    tokenQuantity.value = 1;
  }
});

const currentPaymentTransaction = ref(null);

const buyTokenLoading = ref(false);
async function handleBuyToken() {
  if (tokenQuantity.value) {
    if (Number(tokenQuantity.value) >= 1) {
      buyTokenLoading.value = true;

      await $fetch("/payment/submitToken", {
        baseURL,
        headers,
        params: {
          token_id: price.value.id,
          qty: tokenQuantity.value,
        },
      })
        .then((res) => {
          currentPaymentTransaction.value = res.data.payment_transaction;

          startPayment();

          openTokensModal.value = false;
        })
        .catch((e) => {
          console.error(e);

          toast.error(e.response._data.Error[0]);
        })
        .finally(() => (buyTokenLoading.value = false));
    }
  }
}

/* Start of the function that call the payment gateway */
function startPayment() {
  const payment = new GeideaCheckout(
    onPaymentSuccess,
    onPaymentError,
    onPaymentCancel,
  );

  payment.startPayment(currentPaymentTransaction.value.session_id);
}
/* End of the function that call the payment gateway */

/* Start of the function that handle the success of the payment */
async function onPaymentSuccess() {
  $fetch("/payment/paymentComplete", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
      order: {
        status: "Success",
        merchantReferenceId: currentPaymentTransaction.value.success_indicator,
      },
    },
    method: "POST",
  })
    .then(() => {
      toast.success(t("TEXTS.paidSuccessfully"));

      refresh();

      refreshBalance();
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}
/* End of the function that handle the success of the payment */

/* Start of the function that handle the error of the payment */
async function onPaymentError() {
  $fetch("/payment/paymentRejected", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(t("TEXTS.paymentFailed")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}
/* End of the function that handle the error of the payment */

/* Start of the function that handle the cancellation of the payment */
async function onPaymentCancel() {
  $fetch("/payment/paymentCanceled", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(t("TEXTS.paymentCancelled")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}
/* End of the function that handle the cancellation of the payment */
/* End of the function that handle buy token */

/* Start of function that get the token price */
const { data: price, pending: pricePending } = await useFetch(
  "/token/getPrice",
  {
    baseURL,
    headers,
    transform: (res) => res.data.token,
  },
);
/* End of the function that get the token price */

/* Start of the function that get the tokens balance */
const {
  data: balance,
  pending: balancePending,
  refresh: refreshBalance,
} = await useFetch("/token/getBalance", {
  baseURL,
  headers,
  transform: (res) => res.data.user_token_balance,
});
/* End of the function that get the tokens balance */

/* Start of the function that fetch data */
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

const { data, pending, refresh } = await useAsyncData(
  "listing-token",
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

    return $fetch("/paymentTransaction/getByFilter", {
      baseURL,
      method: "POST",
      headers,
      body: {
        page: 1,
        filters: {
          payment_transactions,
        },
        related_objects: [],
        related_objects_count: [],
        page_size: 9999,
      },
    });
  },
  {
    watch: [() => route.query],
    transform: (res) => res.data.payment_transaction.data,
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
