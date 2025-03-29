<script setup lang="ts">
import type { UserResponse } from '~/types/types';
import InfoItem from './InfoItem.vue'
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
const profileData : UserResponse = authStore.profileData as any
</script>
<template>
    <div>
      <InfoItem label="Broker Address" :value="profileData.broker.brokerage_address!" />
      <InfoItem label="Phone" :value="profileData.country_code_phone + profileData.phone" />
      <InfoItem label="Member Since" :value="new Date(profileData.created_at!).toDateString()" />
      <!-- <InfoItem label="Country" :value="globalStore.userProfile!" /> -->
      <InfoItem label="National ID" :value="profileData.broker.government_national_id!" />
      <InfoItem label="Email" :value="profileData.email" />
      <div class="border-t p-6 flex justify-center gap-5 items-center">
        <a class="">
          <!-- <VsxIcon iconName="Facebook" :size="32" color="#0062FF" type="linear" /> -->
          <font-awesome-icon class="text-xl bg-[#CC0001] p-2 rounded-full text-white" :icon="['fab', 'facebook']" />
        </a>
        <a>
          <font-awesome-icon class="text-xl bg-[#CC0001] p-2 rounded-full text-white" :icon="['fab', 'instagram']" />
        </a>
        <a>
          <font-awesome-icon class="text-xl bg-[#CC0001] p-2 rounded-full text-white" :icon="['fab', 'linkedin']" />
          <!-- <i class="pi pi-twitter !text-2xl text-[#0062FF]"></i> -->
        </a>
      </div>
    </div>
  </template>
  