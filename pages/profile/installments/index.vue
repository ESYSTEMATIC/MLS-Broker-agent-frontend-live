<template>
  <div>
    <div
      class="mb-6 rounded-2xl bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
    >
      <h3 class="mb-2 text-primary text-2xl font-bold leading-9 text-white">
        {{ $t("TITLES.installments") }}
      </h3>

      <div class="flex items-center gap-7">
        <p class="flex items-center gap-2 text-white">
          <span>{{ $t("TITLES.remaining_installments") }}:</span>
          <span>23 May, 2025</span>
        </p>

        <p class="flex items-center gap-2 text-white">
          <span>{{ $t("TITLES.next_installments") }}:</span>
          <span>23 May, 2025</span>
        </p>
      </div>
    </div>

    <div class="mb-6">
      <GlobalsBaseFilter :items="dataFilter">
        <!-- <template #buttons> </template> -->
      </GlobalsBaseFilter>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const { t } = useI18n();
useHead({
  title: t("TITLES.membership_renewal"),
  meta: [{}],
});

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

const items = ref([
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
  {
    id: 1,
    name: "Renew Member Ship",
    date: "May 1, 2024",
    amount: "732,190",
  },
]);
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
