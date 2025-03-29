<template>
    <article
      class="flex flex-col grow shrink items-center self-stretch py-3 pr-2.5 pl-1 my-auto bg-white dark:bg-box-container-dark rounded-2xl min-h-[472px] min-w-60 shadow-[0px_4px_26px_rgba(66,71,76,0.08)] w-[266px]"
    >
      <img
        loading="lazy"
        :src="propertyImage"
        class="object-contain max-w-full rounded-xl aspect-[1.42] w-[314px]"
        alt="Property"
      />
      <div class="flex flex-col mt-5 max-w-full w-[300px]">
        <div class="flex flex-col w-full min-h-[202px]">
          <div class="flex gap-3 justify-center items-center self-start">
            <div
              class="self-stretch px-1.5 my-auto text-sm leading-snug text-center text-white whitespace-nowrap bg-black rounded min-h-[18px] w-[29px]"
            >
              4.7
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/f55697ef66d359fcdd7e63ecc2c9cd5d1bf920607ad2432556b4353a923bd114"
              class="object-contain shrink-0 self-stretch my-auto aspect-[6.62] w-[93px]"
              alt="Rating"
            />
            <div class="self-stretch my-auto text-xs font-medium text-blue-800">
              (578 Reviews)
            </div>
          </div>
          <div class="pb-2 mt-1.5 w-full">
            <div
              class="flex z-10 gap-5 justify-between mt-0 text-lg font-semibold text-zinc-900 max-md:mr-1"
            >
              <h3>Spacious & Luxurious</h3>
              <button>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/c876a4857ff35a279239cbd44657b667a0b708f72042a677bb5ac510d39c0c4d"
                  class="object-contain shrink-0 my-auto w-6 aspect-square"
                  alt="Favorite"
                />
              </button>
            </div>
            <div class="flex gap-1 items-center text-xs min-h-[18px] text-neutral-700">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/dd398d83fe860a2fb189ec53e8e9d9c9fdd3d360491aa4cd2d6cdb965c8803b6"
                class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                alt="Location"
              />
              <div class="self-stretch my-auto">Downtown, Cairo</div>
            </div>
          </div>
          <div class="flex mt-1.5 w-full bg-zinc-100 min-h-px"></div>
          <div class="mt-1.5 text-lg font-semibold text-blue-800">
            $ 7,500 000 00
          </div>
        </div>
        <div
          class="z-10 self-end py-5 pr-3.5 pl-4 mt-0 text-xs leading-4 whitespace-nowrap min-h-[57px] text-neutral-700 max-md:mr-2.5"
        >
          95%
        </div>
        <div class="mt-0 w-full text-sm font-semibold text-neutral-700">
          <div class="flex gap-10 justify-between items-center w-full">
            <div class="gap-0.5 self-stretch my-auto">MLS ID: 829227</div>
            <div
              class="flex shrink-0 self-stretch my-auto rounded-none h-[21px] w-[69px]"
            ></div>
          </div>
          <div class="flex justify-between items-center mt-2 w-full">
            <div class="gap-0.5 self-stretch my-auto">Agent Lead : 20%</div>
          </div>
          <div class="flex justify-between items-center mt-2 w-full">
            <div class="gap-0.5 self-stretch my-auto">Expected Lead : 49</div>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  
  const propertyImages = [
    "https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/b63036b4-7c2a-42a3-8d01-956284e3a579",
    "https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/77613778-00f0-4978-83bb-3f418e47d5ff",
    "https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/5b7bad15-7020-40fc-8b83-f772f2a58533",
  ];
  
  const propertyImage = computed(() => {
    const randomIndex = Math.floor(Math.random() * propertyImages.length);
    return propertyImages[randomIndex];
  });
  </script>