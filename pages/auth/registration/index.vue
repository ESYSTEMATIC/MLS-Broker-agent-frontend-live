<template>
  <Teleport to="body">
    <GlobalsModal v-if="paymentModal" special hideClose>
      <div class="flex flex-col items-center justify-center gap-3">
        <img src="/icons/waiting.svg" alt="waiting" :draggable="false" />

        <p
          class="text-title-light dark:text-title-dark xl:text-lg xl:font-medium"
        >
          {{ $t("TEXTS.waitingForPayment") }}
        </p>
      </div>
    </GlobalsModal>
  </Teleport>

  <div v-if="!paymentModal" class="flex flex-col items-center justify-center">
    <h2 class="my-2 text-5xl  pt-3 text-white font-bold">
      {{ $t("TITLES.activate_your_membership") }}
    </h2>

    <p class="font-medium text-[#6D6E76]">
      {{ $t("TITLES.follow_these_steps") }}
    </p>

    <div class="mt-20">
      <div
        class="mb-5 grid grid-cols-12 items-center font-medium xl:mb-12"
        :class="step != 3 ? 'w-[70vw]' : ''"
      >
        <button
          type="button"
          class="col-span-12 flex items-center gap-2 pb-5 pe-7 duration-200 lg:col-span-6 xl:border-b-2 xl:pb-3"
          :class="step === 1 ? 'border-primary' : 'border-text-[#9FA7A8]'"
          @click="step = 1"
          disabled
        >
          <span
            v-if="step == 1"
            class="flex size-[24px] items-center justify-center rounded-full text-sm text-white dark:text-inherit"
            :class="step === 1 ? 'bg-primary text-white' : 'bg-[#9FA7A8]'"
            >1</span
          >
          <span
            v-if="step > 1"
            class="flex size-[24px] items-center justify-center rounded-full border border-primary text-sm text-white dark:text-inherit"
          >
            <img src="/icons/vector.svg" />
          </span>

          <span
            :class="[
              step === 1 ? 'text-primary' : 'text-[#9FA7A8]',
              step > 1 && 'text-primary',
            ]"
          >
            {{ $t("TITLES.select_package") }}
          </span>
        </button>

        <button
          type="button"
          class="col-span-12 flex items-center gap-2 pb-5 pe-7 duration-200 lg:col-span-6 xl:justify-center xl:border-b-2 xl:pb-3"
          :class="step === 2 ? 'border-primary' : 'border-text-[#9FA7A8]'"
          @click="step = 2"
          disabled
        >
          <span
            v-if="step === 2"
            class="flex size-[24px] items-center justify-center rounded-full text-sm text-white dark:text-inherit"
            :class="step === 2 ? 'bg-primary text-white' : 'bg-[#9FA7A8]'"
            >2</span
          >
          <span
            v-if="step > 2"
            class="flex size-[24px] items-center justify-center rounded-full border border-primary text-sm text-white dark:text-inherit"
          >
            <img src="/icons/vector.svg" />
          </span>

          <span
            :class="[
              step === 2 ? 'text-primary' : 'text-[#9FA7A8]',
              step > 2 && 'text-primary',
            ]"
          >
            {{ $t("TITLES.payments") }}
          </span>
        </button>

        <!-- <button
          type="button"
          class="col-span-12 flex items-center gap-2 pb-5 pe-7 duration-200 lg:col-span-4 xl:justify-center xl:border-b-2 xl:pb-3"
          :class="step === 3 ? 'border-primary' : 'border-text-[#9FA7A8]'"
          @click="step = 3"
          disabled
        >
          <span
            class="flex size-[24px] items-center justify-center rounded-full text-sm text-white dark:text-inherit"
            :class="step === 3 ? 'bg-primary text-white' : 'bg-[#9FA7A8]'"
            >3</span
          >

          <span :class="step === 3 ? 'text-primary' : 'text-[#9FA7A8]'">
            {{ $t("TITLES.training_videos") }}
          </span>
        </button> -->
      </div>

      <template v-if="step == 1">
        <div class="mb-8 flex items-center justify-center">
          <label
            v-for="(item, idx) in packages"
            :key="idx"
            :for="item.id"
            class="block min-w-[400px] cursor-pointer rounded-[20px] border p-6"
            :class="
              selectedPackage?.id == item?.id
                ? 'custom-shadow border-[#CE112780]'
                : 'border-[#ddd]'
            "
          >
            <h3 class="text-white mb-4 text-center">{{ item.name }}</h3>

            <p class="text-white text-center text-xl font-medium">
              {{ item.price }} {{ $t("TITLES.AED") }} / {{ $t("TITLES.user") }}
            </p>

            <hr class="my-6" />

            <div class="h-[100px]">
              <div class="mb-4 flex items-center gap-2">
                <img src="/icons/checked.svg" alt="icon" />
                <span class="text-white">{{ item.description }}</span>
              </div>

              <div class="flex items-center gap-2">
                <img src="/icons/checked.svg" alt="icon" />
                <span class="text-white"
                  >{{ item.duration_days }}
                  {{ $t("TITLES.day_duration") }}</span
                >
              </div>
            </div>

            <input
              class="hidden"
              type="radio"
              :id="item.id"
              :value="item"
              v-model="selectedPackage"
            />
          </label>
        </div>

        <div class="flex items-center mb-3 justify-end">
          <GlobalsButton
            @handleClick="SubmitApplicationFees()"
            :text="$t('BUTTONS.next')"
            class="w-fit bg-primary font-medium text-white"
          />
        </div>
      </template>

      <!-- <template v-if="step == 3">
        <div class="mb-10 w-[85vw]">
          <div class="mb-20 grid grid-cols-12 gap-5">
            <div class="col-span-10">
              <video
                v-if="!loading"
                width="100%"
                class="wow fadeIn h-[50vh] rounded-lg bg-slate-500 shadow-2xl xl:h-[70vh] xl:rounded-[25px]"
                loop
                ref="video"
                controls
              >
                <source
                  :src="currentVideo?.video?.media_url"
                  type="video/mp4"
                />
              </video>
            </div>

            <div class="col-span-2 h-[50vh] overflow-auto px-2 xl:h-[70vh]">
              <div
                v-for="item in videosMaterial"
                :key="item.id"
                class="relative block h-[130px] min-w-[170px] border-2 xl:mb-4 xl:w-full"
                :class="
                  currentVideo?.id == item.id
                    ? 'rounded-xl border-primary'
                    : 'border-transparent'
                "
              >
                <video
                  class="pointer-events-none block !h-full w-full rounded-lg object-cover xl:w-full"
                  width="100%"
                >
                  <source :src="item.video?.media_url" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <button
            type="button"
            :disabled="!isEnded"
            @click="
              updateVideo(
                videosMaterial.findIndex(
                  (item) =>
                    item.id === currentVideo?.id &&
                    item.name === currentVideo?.name,
                ),
              )
            "
            class="min-w-[150px] rounded-lg bg-primary py-4 text-white disabled:bg-[#e9eaea] disabled:text-sub-bg"
          >
            {{ $t("BUTTONS.next") }}
          </button>
        </div>
      </template> -->
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "pending",
});

const i18n = useI18n();

useHead({
  title: i18n.t("BUTTONS.registration"),
  script: [
    {
      src: "https://www.merchant.geidea.net/hpp/geideaCheckout.min.js",
    },
  ],
});

const {
  public: { baseURL },
} = useRuntimeConfig();

const toast = useToast();

const headers = {
  "Accept-Language": i18n.locales.value.find(
    (item) => item.code === i18n.locale.value,
  )?.iso,
  Lang: i18n.locale.value,
  Authorization: `Bearer ${useCookie("mls_egypt_token").value}`,
};

const router = useRouter();

const localePath = useLocalePath();

const authStore = useAuthStore();

const paymentModal = ref(false);

const temporaryToken = useCookie("mls_egypt_temporary_token");

/* Start of the function that get the profile data */
const { data } = await useAsyncData("registration_profile_data", () =>
  $fetch("/profile", {
    baseURL,
    headers: {
      "Accept-Language": i18n.locales.value.find(
        (item) => item.code === i18n.locale.value,
      )?.iso,
      Lang: i18n.locale.value,
      Authorization: `Bearer ${temporaryToken.value}`,
    },
  }),
);
/* End of the function that get the profile data */
const token = useCookie("mls_egypt_token");
const statusCookie = useCookie("status");

if (data.value) {
  if (data.value.data) {
    if (
      data.value.data.status === "active" &&
      data.value.data.training_status === "finished"
    ) {
      token.value = temporaryToken.value;

      statusCookie.value = "active";

      temporaryToken.value = null;

      router.push(localePath("/profile"));
    }
  }
}

const currentStep = ref(1);

/* Get the company data */
const status = computed(() => {
  if (data.value) {
    return data.value.data?.status;
  }

  return useCookie("status").value;
});

const paymentData = ref(null);

if (
  (authStore.registrationData && authStore.registrationData.company_id) ||
  (data.value && data.value?.data?.company_id)
) {
  await useAsyncData("company_Data", () =>
    $fetch("/get-company-by-id", {
      baseURL,
      headers,
      params: {
        company_id: authStore.registrationData.company_id
          ? authStore.registrationData.company_id
          : data.value.data.company_id,
      },
    })
      .then((res) => {
        paymentData.value = res.data.company_setting;

        if (status.value === "training") {
          currentStep.value = 3;
        } else {
          if (
            paymentData.value &&
            paymentData.value.enable_payment_for_subscription === 1
          ) {
            toast.success(i18n.t("TEXTS.waitingForPayment"));

            paymentModal.value = true;
          }
        }
      })
      .catch((e) => console.error(e)),
  );
}
/* End of the function that get the company data */

const step = ref(currentStep.value || 1);

const plans = ref(null);
const getPlan = async () => {
  await $fetch("/payment/paymentPlan/getByFilter", {
    method: "POST",
    baseURL,
    headers,
    body: {
      filters: "",
      page: 1,
      page_size: 999,
      related_objects: [],
      related_objects_count: [],
    },
  })
    .then((res) => {
      plans.value = res.data.payment_plan.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const packages = ref(null);
const getPackages = async () => {
  await $fetch("/membership/packages/getByFilter", {
    method: "POST",
    baseURL,
    headers,
    body: {
      filters: "",
      page: 1,
      page_size: 999,
      related_objects: [],
      related_objects_count: [],
    },
  })
    .then((res) => {
      packages.value = res.data.package.data;
      selectedPackage.value = packages.value[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(
  () => step.value,
  (val) => {
    if (val == 1) {
      getPlan();
      getPackages();
    } else if (val == 3) {
      confirmTraining();
    }
  },
  { deep: true, immediate: true },
);

const selectedPackage = ref(null);

const currentPaymentTransaction = ref(null);

async function SubmitApplicationFees() {
  await $fetch("/payment/submitPackage", {
    method: "GET",
    baseURL,
    headers,
    params: {
      package_id: selectedPackage.value?.id,
      plan_id: 1,
    },
  })
    .then((res) => {
      currentPaymentTransaction.value = res.data.payment_transaction;

      startPayment();
    })
    .catch((e) => {
      console.error(e);
    });
}

function startPayment() {
  const payment = new GeideaCheckout(
    onPaymentSuccess,
    onPaymentError,
    onPaymentCancel,
  );

  payment.startPayment(currentPaymentTransaction.value.session_id);
}

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
      useCookie("status").value = "training";
      confirmTraining();
      toast.success(i18n.t("TEXTS.paidSuccessfully"));
    })
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}

async function onPaymentError() {
  $fetch("/payment/paymentRejected", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(i18n.t("TEXTS.paymentFailed")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}

async function onPaymentCancel() {
  $fetch("/payment/paymentCanceled", {
    baseURL,
    headers,
    body: {
      id: currentPaymentTransaction.value.id,
    },
    method: "POST",
  })
    .then(() => toast.success(i18n.t("TEXTS.paymentCancelled")))
    .catch((e) => {
      console.error(e);

      toast.error(e.response._data.Error[0]);
    })
    .finally(() => (currentPaymentTransaction.value = null));
}

if (useCookie("status").value == "training") {
  step.value = 3;
}

const videosMaterial = ref([]);

const currentVideo = ref(null);

const loading = ref(true);

const video = ref(null);
const lastTime = ref(0);
const isSeeking = ref(false);
const isEnded = ref(false);

async function getVideos() {
  await $fetch("/training/trainingMaterials", {
    method: "GET",
    baseURL,
    headers,
  })
    .then((res) => {
      const result = res.data.sort(
        (a, b) => a.apperance_order - b.apperance_order,
      );
      videosMaterial.value = result;

      let training_status = useCookie("training_status").value;
      currentVideo.value = result[0];
      if (!training_status) {
        currentVideo.value = result[0];
      } else {
        currentVideo.value = result[+training_status];
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
}

watch(
  () => video.value,
  (vid) => {
    if (vid) {
      vid.addEventListener("ended", function () {
        console.log("Video ended.");
      });

      vid.addEventListener("timeupdate", function () {
        if (vid.duration - vid.currentTime < 3) {
          isEnded.value = true;
        }
      });

      vid.addEventListener("seeking", function () {
        if (vid.currentTime > lastTime.value) {
          isSeeking.value = true;
          vid.currentTime = lastTime.value;
        }
      });
    }
  },
  { immediate: true, deep: true },
);

const currentIndex = ref(null);
const updateVideo = async (num) => {
  if (!isEnded.value) return;

  let numPlusOne = num + 1;
  currentIndex.value = numPlusOne;
  if (numPlusOne > 6) return;
  loading.value = true;
  await $fetch("/training/updateStatus", {
    method: "POST",
    baseURL,
    headers,
    body: {
      training_status: numPlusOne.toString(),
    },
  })
    .then((res) => {
      isEnded.value = false;
      useCookie("training_status").value =
        res.data.user?.training_status && res.data.user?.training_status;

      currentVideo.value = videosMaterial.value[numPlusOne];
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(
  () => currentIndex.value,
  (val) => {
    if (val == 7) {
      confirmTraining();
    }
  },
  { deep: true },
);

const confirmTraining = async () => {
  await $fetch("/training/finish", {
    method: "POST",
    baseURL,
    headers,
  })
    .then((res) => {
      useCookie("application_status").value = null;
      useCookie("status").value = null;
      useCookie("training_status").value = null;

      localStorage.setItem("profileData", JSON.stringify(res.data.user));

      router.push(localePath("/profile"));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.custom-shadow {
  box-shadow: 0px 1px 12px 0px #4f4f4f26;
}
</style>
