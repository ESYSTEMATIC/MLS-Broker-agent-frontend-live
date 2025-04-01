<template>

  <Teleport to="body">
    <GlobalsModal :title="$t('TITLES.addReviewRequests')"
      v-if="isReviewModalOpened" 
      :disabled="isReviewCreateLoading"
      @close="isReviewModalOpened = false"
    >
      <div class="pb-10">
        <ProfileReviewsUsersSearch
          apiUrl="/get-users" name="user"
          :placeholder="$t('INPUTS.searchUsersPlaceholder')" @select="(val) => selectedUser = val" />
        <textarea name="message" @input="requestMessage = $event.target.value" rows="7" class="p-4 my-3 w-full border rounded"
         :placeholder="$t('INPUTS.writeMessage')" id=""></textarea>
      </div>

      <div class="flex items-center gap-5">
        <GlobalsButton
          type="button"
          class="h-[53px] flex-1 !rounded-[28px] border border-error font-semibold text-error duration-300 disabled:cursor-not-allowed disabled:opacity-60 [&:not(:disabled)]:hover:bg-error [&:not(:disabled)]:hover:text-white"
          :text="$t('BUTTONS.cancel')"
          :disabled="isReviewCreateLoading"
          @handleClick="isReviewModalOpened = false"
        />

        <GlobalsButton
          type="button"
          class="h-[53px] flex-1 !rounded-[28px] border border-transparent bg-[#CE11271A] font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
          :text="$t('TITLES.addRequest')"
          :disabled="isReviewCreateLoading"
          @click="handleReviewRequestCreate"
        />
      </div>
    </GlobalsModal>
  </Teleport>
    <div>
      <div
      class="mb-6 flex flex-wrap items-center justify-between rounded-2xl light:bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
    >
        <div>
          <h3 class="mb-2 text-primary text-2xl font-bold leading-9">
            {{ $t("TITLES.reviews") }}
          </h3>
    
          <p class="">
            {{ $t("TITLES.your_reviews_requests") }}
          </p>
        </div>  
        <div class="mx-auto mt-2 md:mx-0 md:mt-0">
          <button
            @click="isReviewModalOpened = true"
            type="button"
            class="h-12 min-w-[160px] rounded-full bg-[#CE11270D] font-medium text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary"
          >
            {{ $t("TITLES.addRequest") }}
          </button>
        </div>
      </div>

  
      <div class="rounded-2xl light:bg-white card-shadow px-6 py-4">
        <div class="mb-6">
          <GlobalsBaseFilter :items="dataFilter">
          </GlobalsBaseFilter>
        </div>
    
        <div>
          <ProfileReviewsTable v-if="pending" loading :items="[]" />
    
          <ProfileReviewsTable v-else :items="data" />
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { useToast } from "vue-toastification";
  definePageMeta({
    layout: "profile",
  });
  const selectedUser = ref(null);
  const requestMessage = ref(null);
  const toast = useToast();

  const { t, locale, locales } = useI18n();
  const isReviewModalOpened = ref(false);
  const isReviewCreateLoading = ref(false);
  useHead({
    title: t("TITLES.reviews"),
    meta: [
      {
        name: "description",
        content: t("TITLES.your_reviews"),
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
  
  const handleReviewRequestCreate = () => {
    isReviewCreateLoading.value = true;
    if(!selectedUser.value || !requestMessage.value){
      toast.error('Please Enter Valid Data');
      return
    }
    $fetch("/request-reviews/create", {
      baseURL,
      method: "POST",
      headers,
      body: {
        users: [selectedUser.value.id],
        message: requestMessage.value,
      },
    })
      .then((res) => {
          fetchReviews();
          isReviewModalOpened.value = false;
          selectedUser.value = null;
          requestMessage.value = null;
          toast.success($t('MESSAGES.requestSentSuccessfully'));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isReviewCreateLoading.value = false;
      });
  }

  const { data, pending , refresh: fetchReviews } = await useAsyncData(
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
      transform: (res) => res.data,
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
  