<script setup>
defineProps({
  data: {
    type: String,
    required: true,
    default: null,
  },
  title: {
    type: String,
    required: true,
    default: null,
  },
  icon: {
    type: String,
    required: true,
    default: null,
  },
  email: {
    type: Boolean,
    required: false,
    default: null,
  },
  phone: {
    type: Boolean,
    required: false,
    default: null,
  },
});
</script>

<template>
  <div
    class="wow fadeInUp group cursor-default rounded-[30px] border border-[#EEEEEE] bg-white px-3 py-5 duration-500 hover:scale-105 dark:border-[#2F2F37] dark:bg-transparent xl:col-span-9 xl:px-5 xl:py-7"
  >
    <div class="mb-2 flex items-center justify-between gap-3 lg:mb-3">
      <h5 class="font-medium md:text-lg xl:font-bold">{{ title }}</h5>

      <img
        :src="icon"
        class="size-[28px] duration-500 group-hover:-translate-y-3"
        alt="contact-icon"
        :draggable="false"
      />
    </div>

    <div
      class="text-sm font-medium text-text-dark dark:text-text-light lg:text-base"
    >
      <a v-if="email" :href="`mailto:${data}`">{{ data }}</a>

      <a v-else-if="phone" :href="`tel:${data}`">{{ data }}</a>

      <span v-else>{{ data }}</span>
    </div>
  </div>
</template>
