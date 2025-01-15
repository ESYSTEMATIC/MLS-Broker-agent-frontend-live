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
    class="wow fadeInUp group gap-5 rounded-[16px] border border-[#EEEEEE] bg-[rgba(0,0,0,0.10)] p-7 text-white"
    :style="{ backdropFilter: 'blur(25px)' }"
  >
    <img
      :src="data.image"
      class="size-[85px] object-contain duration-300 group-hover:-translate-y-3"
      alt="feature-image"
      :draggable="false"
    />

    <h5 class="my-3 xl:text-xl font-bold">{{ data.title }}</h5>

    <p class="xl:w-[70%] w-full">{{ data.text }}</p>
  </div>
</template>
