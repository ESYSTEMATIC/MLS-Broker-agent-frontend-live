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

          <span>{{ price.filter((row) => row.key == 'token_price')[0].value }} {{ $t("TITLES.AED") }}</span>
        </div>

        <div class="mb-5 flex items-center justify-between">
          <h5 class="font-medium xl:text-lg">
            {{ $t("TITLES.total") }}
          </h5>
          <span>{{ parseInt(price.filter((row) => row.key == 'token_price')[0].value) * tokenQuantity }} {{ $t("TITLES.AED") }}</span>
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

          <span>{{ authStore.profileData.token_count }}</span>
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
import { useAuthStore } from "~/store/auth";

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
const authStore = useAuthStore()
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
  Authorization: `Bearer ${token}`,
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

      await $fetch("/tokens/buy", {
        baseURL,
        method: "POST",
        headers,
        body: {
          qty: tokenQuantity.value,
        },
      })
        .then((res) => {
          console.log(res.data);
          currentPaymentTransaction.value = res.data.session_id;
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

  payment.startPayment(currentPaymentTransaction.value);
}
/* End of the function that call the payment gateway */

/* Start of the function that handle the success of the payment */
async function onPaymentSuccess() {
  toast.success(t("TEXTS.paidSuccessfully"));
  location.reload()
}
/* End of the function that handle the success of the payment */

/* Start of the function that handle the error of the payment */
async function onPaymentError() {
  toast.success(t("TEXTS.paymentFailed"))
  currentPaymentTransaction.value = null
}
/* End of the function that handle the error of the payment */

/* Start of the function that handle the cancellation of the payment */
async function onPaymentCancel() {
  toast.success(t("TEXTS.paymentCancelled"))
  currentPaymentTransaction.value = null
}
/* End of the function that handle the cancellation of the payment */
/* End of the function that handle buy token */


const {
  data: price,
  pending: pricePending,
  refresh: refreshPrices,
} = await useFetch("/all/prices", {
  baseURL,
  headers,
  transform: (res) => res.data,
});

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

    return $fetch("/tokens/getByFilter", {
      baseURL,
      method: "GET",
      headers,
    });
  },
  {
    watch: [() => route.query],
    transform: (res) => res.data,
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
