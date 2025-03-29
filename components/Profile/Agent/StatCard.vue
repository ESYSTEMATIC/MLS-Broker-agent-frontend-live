<template>
    <div class="flex flex-1 shrink gap-8 items-start self-stretch py-5 pr-4 pl-5 my-auto bg-white rounded-xl border border-solid basis-0 border-zinc-100 min-w-60 shadow-[0px_5px_5px_rgba(82,63,105,0.05)] max-md:pl-5">
      <div class="flex-1 shrink basis-8">
        <h2 class="text-3xl font-semibold leading-snug text-black">{{ title }}</h2>
        <div class="mt-9 w-full">
          <div class="text-base font-medium leading-7 text-black">{{ subtitle }}</div>
          <div class="text-sm leading-snug text-zinc-500">{{ description }}</div>
        </div>
      </div>
      <div class="flex relative gap-2.5 items-start p-4 text-sm font-semibold leading-normal" :class="colorClasses">
        <div class="flex z-0 shrink-0 self-stretch my-auto h-[57px] rounded-[57px] w-[57px]" :class="bgColorClass"></div>
        <img :src="chartImage" class="object-contain absolute -right-px -bottom-px z-0 shrink-0 aspect-square h-[90px] w-[90px]" alt="Chart" />
        <div class="absolute z-0 h-5 bottom-[34px] right-[31px] w-[25px]">{{ percentage }}%</div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { computed } from 'vue';

  const props = defineProps({
    title: String,
    subtitle: String,
    description: String,
    percentage: String,
    color: String
  })
  
  const colorClasses = computed(() => ({
    'text-indigo-700': props.color === 'indigo',
    'text-green-800': props.color === 'green'
  }))
  
  const bgColorClass = computed(() => ({
    'bg-slate-200': props.color === 'indigo',
    'bg-emerald-100': props.color === 'green'
  }))
  
  const chartImage = computed(() => props.color === 'indigo' 
    ? 'https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/ca17508a31751dadd2b4f3e396e700ca0372e8a212d7627aded938faf681c9f1'
    : 'https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/2c25de3ea256a0b983f745fbc54e18aeb1060e26de97e45cb18b6b61cb178247'
  )
  </script>