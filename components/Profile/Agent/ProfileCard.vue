<template>
    <div v-if="profileData" class="w-[33%] max-md:ml-0 max-md:w-full">
      <div class="flex overflow-hidden flex-col pb-3.5 mx-auto w-full bg-white dark:bg-box-container-dark rounded-xl card-shadow max-md:mt-6">
        <div class="flex relative flex-col w-full text-center text-white aspect-[1.596]">
          <!-- <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/1742201e04f8428658b2aeb69c395ea0adc7ce8ef524825bff8008c3cdd0ba06?placeholderIfAbsent=true" class="object-cover absolute inset-0 size-full" alt="Background" /> -->
          <div class="flex relative flex-col items-center px-16 py-5 max-md:px-5">
            <img v-if="profileData.image" loading="lazy" :src="profileData.image" class="object-cover max-w-full aspect-square rounded-[50px] w-[100px]" alt="Profile" />
            <img v-else loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/717226a0896047488cddaebda0644854/c3b6f2476ea507debd8fa308396df6c3c4f88102a8868bc1738441e3976e8c82?placeholderIfAbsent=true" class="object-contain max-w-full aspect-square rounded-[50px] w-[100px]" alt="Profile" />
            <h3 class="mt-3 text-black dark:text-white text-2xl font-semibold">{{ profileData.name }}</h3>
            <p class="mt-2 text-[#CC0001] text-sm leading-relaxed">Certified MLS Agent</p>
            <p class="mt-2 text-black dark:text-white text-sm leading-relaxed">MLS ID : {{ profileData.mls_id }}</p>
          </div>
        </div>
        <ProfileInfo />
      </div>
    </div>
</template>
<script setup lang="ts">
import type { UserResponse } from '~/types/types';
import ProfileInfo from './ProfileInfo.vue'
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
const profileData : UserResponse = authStore.profileData as any
</script>