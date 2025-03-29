<template>
    <section class="p-6 mt-7 w-full bg-white dark:bg-box-container-dark rounded-xl card-shadow max-md:px-5 max-md:mr-1 max-md:max-w-full">
      <div class="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <h2 class="text-xl font-semibold leading-snug dark:text-white text-stone-950">Service Area</h2>
        <button class="h-12 min-w-[140px] rounded-full bg-[#CE11270D] font-medium text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary">Add Area</button>
      </div>
      <div class="flex flex-wrap gap-6 items-start mt-5 w-full text-black max-md:max-w-full">
        <AreaCard 
          v-for="area in areas" 
          :key="area.title"
          v-bind="area"
        />
      </div>
    </section>
  </template>
  
<script setup lang="ts">
import AreaCard from './AreaCard.vue'
  
  const areas = [
    {
      title: "New cairo, Nasr City",
      stats: "Agent have : 10% Expected leads: 59",
      image: "https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/faec471454cedae58f6177b54b911c65967274d52e69c3c0e5a68b5fd63fe258"
    },
    {
      title: "Zamalek, Cairo",
      stats: "Agent have : 20% Expected leads: 107",
      image: "https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/1c3a8d26fd79ef9540e5a60252b63726ce3881828674ad78b9ad04391f4b9378"
    },
    {
      title: "Alexandria, Miami",
      stats: "Agent have : 15% Expected leads: 77",
      image: "https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/b386014eb1b0fbfc3819721dddf703086e2f1a84e0d5b7167ff150cc3f70e312"
    }
  ]
  </script>