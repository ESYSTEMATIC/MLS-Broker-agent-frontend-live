<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: null,
  },
  text: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: String,
    required: false,
    default: null,
  },
  paginateClass: {
    type: String,
    required: false,
    default: null,
  },
});

const localePath = useLocalePath();
</script>

<template>
  <div
    class="mb-5 flex flex-col justify-between gap-5 xl:flex-row xl:items-center"
  >
    <div class="flex flex-col items-start gap-3">
      <h3 class="wow fadeInUp text-lg font-bold uppercase xl:text-4xl">
        {{ title }}
      </h3>

      <p
        v-if="text"
        class="wow fadeInUp text-sm text-text-light dark:text-text-dark"
      >
        {{ text }}
      </p>
    </div>

    <div class="flex flex-1 items-center justify-between gap-3 xl:flex-initial">
      <div
        v-if="paginateClass"
        class="wow fadeInUp flex items-center gap-3 rounded-[100px] bg-[#EBEBEB] px-2 py-1.5 dark:bg-[#0B0909]"
      >
        <button
          type="button"
          class="flex size-[50px] items-center justify-center rounded-full bg-white text-lg text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1C1C21] dark:text-white"
          :class="`${paginateClass}-prev`"
        >
          <font-awesome-icon
            :icon="`fa-solid fa-angle-${$i18n.locale === 'ar' ? 'right' : 'left'}`"
          />
        </button>

        <button
          type="button"
          class="flex size-[50px] items-center justify-center rounded-full bg-white text-lg text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1C1C21] dark:text-white"
          :class="`${paginateClass}-next`"
        >
          <font-awesome-icon
            :icon="`fa-solid fa-angle-${$i18n.locale === 'ar' ? 'left' : 'right'}`"
          />
        </button>
      </div>

      <RouterLink
        v-if="link"
        :to="localePath(link)"
        class="wow fadeInUp text-lg font-medium text-primary"
        >{{ $t("BUTTONS.seeAll") }}</RouterLink
      >
    </div>
  </div>
</template>
