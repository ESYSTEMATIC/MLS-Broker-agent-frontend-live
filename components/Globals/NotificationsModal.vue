<template>
  <div
    class="fixed end-0 top-0 z-[1001] h-screen w-full bg-white px-6 py-8 dark:bg-[#141414] md:w-[630px]"
  >
    <div class="mb-[42px] flex items-center justify-between">
      <h3 class="text-2xl font-semibold">{{ $t("TITLES.notifications") }}</h3>

      <button
        type="button"
        class="absolute end-5 top-5 flex size-[50px] items-center justify-center rounded-full border border-transparent bg-white dark:border-[#1C1C21] dark:bg-[#0B0202]"
        @click="$emit('close')"
      >
        <ClientOnly>
          <img
            v-if="$colorMode.value === 'light'"
            src="/globals/icons/close-dark.svg"
            alt="close-dark-image"
            :draggable="false"
          />

          <img
            v-else
            src="/globals/icons/close-light.svg"
            alt="close-light-image"
            :draggable="false"
          />
        </ClientOnly>
      </button>
    </div>

    <div>
      <div
        v-for="notification in notifications"
        :key="notification.title"
        class="mb-4 w-full rounded-2xl border border-primary border-opacity-25 bg-primary bg-opacity-10 capitalize last:mb-0 dark:border-none dark:bg-boxDB-dark"
      >
        <div class="flex gap-4 p-4">
          <div>
            <img
              v-if="$colorMode.value == 'light'"
              src="/profile/logo-sm-light.svg"
              alt="notification-icon"
              :draggable="false"
              class="w-[50px]"
            />
            <img
              v-else
              src="/profile/logo-sm-dark.svg"
              alt="notification-icon"
              :draggable="false"
              class="w-[50px]"
            />
          </div>

          <div class="flex-grow">
            <h4 class="mb-2 font-semibold">{{ notification.title }}</h4>

            <p class="mb-4 text-gray-400 dark:text-gray-100 me-2">
              {{ notification.body }}
            </p>

            <p
              class="flex items-center justify-end text-gray-400 dark:text-gray-100"
            >
              {{ notification.time }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const i18n = useI18n();

const notifications = ref([
  {
    title: i18n.t('TITLES.yourAccountHasBeenAccepted'),
    body: i18n.t('TEXTS.completePayment'),
    time: "05:OOpm 5/10/2023",
  },
  {
    title: i18n.t('TITLES.membershipExpiration'),
    body: i18n.t('TEXTS.renewMembership'),
    time: "07:OOam 1/03/2024",
  },
]);
</script>

<style lang="scss" scoped></style>
