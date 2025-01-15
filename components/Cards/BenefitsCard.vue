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
    class="wow fadeInUp group flex flex-col items-start gap-5 rounded-[16px] border border-[#EEEEEE] bg-[rgba(0,0,0,0.10)] p-5 lg:flex-row lg:items-center lg:p-10"
    :style="{ backdropFilter: 'blur(25px)' }"
  >
    <img
      :src="data.image"
      class="size-[90px] object-contain duration-300 group-hover:-translate-y-3"
      alt="benefit"
      :draggable="false"
    />

    <div class="flex flex-col items-start gap-3 text-white">
      <h5 class="font-medium lg:text-xl lg:font-bold">{{ data.title }}</h5>

      <p class="text-sm lg:text-base">{{ data.text }}</p>
    </div>
  </div>
</template>
