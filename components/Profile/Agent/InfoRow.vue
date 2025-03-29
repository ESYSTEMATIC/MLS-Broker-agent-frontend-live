<template>
    <div class="flex flex-wrap gap-5 justify-between p-2 w-full max-md:max-w-full">
      <div class="flex gap-2.5">
        <img v-if="icon" src="https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/414c7b83aea9b14caf729300f152d1da528ef0bbb2faadc3b9c10a80ec4c5dcc" class="object-contain shrink-0 aspect-square w-[26px]" :alt="label" />
        <div class="my-auto">{{ label }}</div>
      </div>
      <div class="my-auto">{{ value }}</div>
    </div>
  </template>
  
<script setup lang="ts">
  const props = defineProps({
    icon: String,
    label: String,
    value: String
  })

</script>