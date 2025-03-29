<script setup lang="ts">
import type { UserResponse } from '~/types/types';
import InfoRow from './InfoRow.vue'
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
const profileData : UserResponse = authStore.profileData as any
</script>
<template>
    <div class="mt-3 w-full text-sm font-medium text-zinc-500 max-md:max-w-full">
      <h1 class="w-full dark:text-white text-xl px-3 py-3 font-semibold text-black rounded-xl max-md:pr-5 max-md:max-w-full">About Me</h1>
      <p class="px-3 pb-3">Hello! I'm mohamed, a dedicated and experienced professional in the field of [Industry/Field]. With a passion for delivering exceptional service and a keen eye for detail, I strive to exceed client expectations and build lasting relationships.
        My journey in real estate began 4 years ago, and since then, I've had the privilege of working with a diverse range of clients and projects. My expertise includes [list key skills or areas of expertise], and I am committed to staying updated with the latest industry trends and best practices.
        At the heart of my approach is a strong belief in collaboration and communication. I take the time to understand my clients' unique needs and goals, ensuring that every solution I provide is tailored to their specific requirements. Whether it's [mention specific services or tasks], I am here to support you every step of the way.</p>
    </div>
  </template>
  