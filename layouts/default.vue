<script setup>
import { useRouter } from 'vue-router';
const {push} = useRouter();

onMounted(() => {
  push('/auth/login')
})
</script>

<template>
  <div class="min-h-screen">
    <!-- <NavigationNavbar /> -->

    <slot />

    <!-- <Footer /> -->
  </div>
</template>
