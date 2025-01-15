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
    class="wow fadeInUp rounded-[15px] border border-[#CE11271A] p-2.5 dark:border-inputBg-dark"
  >
    <img
      class="mb-5 block h-[300px] w-full rounded-[15px] object-cover xl:h-[350px] xl:object-top"
      :src="data.image"
      alt="team-image"
      :draggable="false"
    />

    <div class="flex w-full flex-col items-center justify-center">
      <p class="font-medium">{{ data.name }}</p>

      <span class="text-sm text-text-dark dark:text-text-light">{{
        data.position
      }}</span>
    </div>
  </div>
</template>
