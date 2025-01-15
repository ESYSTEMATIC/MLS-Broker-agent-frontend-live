<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: null,
  },
  index: {
    type: Number,
    required: false,
    default: null,
  },
});
</script>

<template>
  <div
    class="wow fadeInUp space-y-3 rounded-[20px] border border-[#CE11271A] bg-[#CE11271A] p-5 dark:border-[#272727] dark:bg-[#1D1D1D]"
  >
    <h5 class="text-xl font-bold text-title-light dark:text-primary">
      {{ data.value }}{{ index < 2 ? "M " : "" }} +
    </h5>

    <h6>
      {{ data.title }}
    </h6>
  </div>
</template>
