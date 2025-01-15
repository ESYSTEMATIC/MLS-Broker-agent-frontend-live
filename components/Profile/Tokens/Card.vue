<template>
  <div
    class="card relative z-[10] overflow-hidden rounded-2xl border p-4 transition-all dark:border-none dark:bg-[#2c2c2c]"
  >
    <div
      class="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-border-dark"
    >
      <div class="flex items-center gap-3">
        <img src="/profile/icons/coins.svg" alt="token" draggable="false" />

        <GlobalsSkeleton v-if="loading" class="h-[21px] w-[150px]" />
        <h4 v-else class="font-medium capitalize">
          {{ card.purchase_type || $t("TEXTS.notFound") }}
        </h4>
      </div>

      <GlobalsSkeleton v-if="loading" class="size-9 !rounded-full" />
      <p
        v-else
        class="flex aspect-auto min-h-9 min-w-9 w-fit items-center justify-center rounded-[50%] border-2 border-[#F01E1E] text-primary object-contain pt-[1px] font-medium"
      >
        {{ card.quantity }}
      </p>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img
          src="/profile/icons/calendar.svg"
          alt="calendar"
          class="dark:brightness-200"
        />

        <GlobalsSkeleton v-if="loading" class="h-[20px] w-[100px]" />
        <p v-else class="text-sm font-medium text-gray-400 dark:text-gray-200">
          {{
            new Date(card.created_at)
              .toLocaleDateString()
              .toString()
              .replaceAll("/", "-")
          }}
        </p>
      </div>

      <GlobalsSkeleton v-if="loading" class="h-[21px] w-[100px]" />
      <p v-else class="text-xl font-bold text-[#008000]">
        {{ card.total_price.toLocaleString() }}
        {{ $t("TITLES.AED") }}
      </p>
    </div>

    <div v-if="!loading" class="hovered-bg" />
  </div>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.card {
  .hovered-bg {
    @apply absolute bottom-0 end-0 -z-10 h-0 w-0 overflow-hidden rounded-none bg-[#f8f8f8] transition-all duration-[1000ms] dark:bg-box-container-dark;
  }
  &:hover {
    .hovered-bg {
      @apply h-[1000px] w-[1000px] rounded-s-full rounded-t-full;
    }
  }
  .btn-card {
    svg {
      @apply transition-[800ms];
    }
    &:hover {
      svg {
        @apply -rotate-45 text-white dark:text-title-light;
      }
    }
  }
}
</style>
