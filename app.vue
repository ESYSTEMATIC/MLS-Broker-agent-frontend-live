<script setup>
import "swiper/css";
import "swiper/css/navigation";

onMounted(() => {
  const wow = new window.WOW();

  wow.init();
});
</script>

<template>
  <NuxtLayout>
    <ClientOnly>
      <NuxtLoadingIndicator
        :color="$colorMode.value === 'dark' ? '#fff' : '#CE1127'"
        :height="5"
      />
    </ClientOnly>

    <NuxtPage />
  </NuxtLayout>
</template>
