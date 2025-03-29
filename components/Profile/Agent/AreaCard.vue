<template>
    <article class="flex flex-col grow shrink justify-center p-4 rounded-2xl border border-solid border-zinc-100 min-w-60 w-[261px]">
      <div class="w-full">
        <div class="flex flex-col w-full rounded-none">
          <h3 class="self-start text-sm font-medium">{{ title }}</h3>
          <p class="mt-2 text-sm">{{ stats }}</p>
        </div>
        <img :src="image" loading="lazy" class="object-contain mt-2 w-full rounded-none aspect-[2.21]" :alt="title" />
      </div>
    </article>
  </template>
  
<script setup lang="ts">
  defineProps({
    title: String,
    stats: String,
    image: String
  })
</script>