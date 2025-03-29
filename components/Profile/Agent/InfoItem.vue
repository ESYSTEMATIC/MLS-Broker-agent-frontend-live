<template>
    <div class="flex gap-5 border-b justify-between px-6 py-5 text-sm whitespace-nowrap max-md:px-5">
      <div class="text-zinc-500 dark:text-white">{{ label }}</div>
      <div class="font-bold dark:text-white text-black">{{ value }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    label: String,
    value: String
  })
  </script>