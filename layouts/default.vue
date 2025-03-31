<script setup>
import { useRouter } from 'vue-router';
const {push} = useRouter();

onMounted(() => {
  push('/auth/login')
})
</script>

<template>
  <div class="min-h-screen broker-app-container">
    <!-- <NavigationNavbar /> -->

    <slot />

    <!-- <Footer /> -->
  </div>
</template>
<style>
.broker-app-container{
  background-image: url(/globals/pattern.png);
  background-size: cover;
}
</style>
