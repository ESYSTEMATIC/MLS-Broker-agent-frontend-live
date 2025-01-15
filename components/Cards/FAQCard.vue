<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: null,
  },
});
</script>

<template>
  <div
    class="wow fadeInUp rounded-[15px] border border-[#CE11271A] bg-white p-7 dark:border-inputBg-dark dark:bg-transparent"
  >
    <h5 class="mb-3 font-semibold xl:mb-7">{{ data.title }}</h5>

    <p
      class="mb-5 line-clamp-2 text-sm text-text-dark dark:text-text-light xl:text-base"
      :title="data.text"
    >
      {{ data.text }}
    </p>

    <button
      type="button"
      class="h-[50px] min-w-[130px] rounded-[36px] border px-5 text-sm duration-300 hover:!bg-primary hover:!text-white dark:border-[#CE11271A] dark:bg-[#CE11271A] dark:text-primary"
      :aria-labelledby="$t('BUTTONS.viewAllFaqs')"
    >
      {{ $t("BUTTONS.learnMore") }}
    </button>
  </div>
</template>
