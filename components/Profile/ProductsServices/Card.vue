<template>
  <div
    class="card relative z-[10] w-[260px] min-h-[200px] overflow-hidden rounded-2xl border p-4 transition-all dark:border-box-container-dark dark:bg-[#2c2c2c]"
  >
    <button
      @click="$emit('makePinUnPin', card.id)"
      class="pin-btn group absolute end-1 top-1 flex size-11 items-center justify-center rounded-full bg-[#FFF4F4] transition-all hover:bg-primary dark:bg-[#FFF4F4] hover:dark:bg-primary"
      type="button"
    >
      <img
        class="pin-red inline group-hover:hidden"
        src="/public/profile/icons/pin.svg"
      />
      <img
        class="pin-white group-hover:inline"
        src="/public/profile/icons/pin-white.svg"
      />
    </button>

    <div
      class="mb-6 flex w-full items-center justify-center overflow-hidden rounded-lg border border-[#d0d0d0]"
    >
      <ClientOnly>
        <img
          :src="
            card.image
              ? card.image
              : $colorMode.value === 'light'
                ? '/logo/egypt-logo-dark.svg'
                : '/logo/egypt-logo-light.svg'
          "
          :alt="card.title"
          class="h-[116px] object-contain py-3 dark:border-[#676767]"
          draggable="false"
        />
      </ClientOnly>
    </div>

    <div class="flex w-full items-center justify-between">
      <div class="max-w-[calc(100%-40px)]">
        <h4 class="mb-1 max-w-full truncate font-semibold" :title="card.title">
          {{ card.title }}
        </h4>

        <p
          class="max-w-full truncate text-sm text-gray-600 dark:text-gray-400"
          :title="card.description"
        >
          {{ card.description }}
        </p>
      </div>

      <div>
        <NuxtLink
          :to="card.to"
          target="_blank"
          class="btn-card flex size-11 items-center justify-center rounded-full bg-[#FFF4F4] transition-all hover:bg-primary dark:bg-[#FFF4F4] hover:dark:bg-primary"
        >
          <font-awesome-icon
            :icon="`fas fa-arrow-${locale === 'ar' ? 'left' : 'right'}`"
            class="text-primary transition-all"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="hovered-bg"></div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.pin-white{
  @apply hidden;
}

.pinned .pin-btn{
  @apply bg-primary;
}

.pinned .pin-white{
  display: flex !important;
}
.pinned .pin-red{
  @apply hidden;
}

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
        @apply text-white dark:text-title-light ltr:-rotate-45 rtl:rotate-45;
      }
    }
  }
}
</style>
