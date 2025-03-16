<script setup>
import "swiper/css";
import "swiper/css/navigation";
import { useHead } from "#imports";
import { onMounted } from "vue";

// Add Google Tag Manager script to the head
useHead({
  script: [
    {
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P3SKLNGR');`,
      type: "text/javascript"
    }
  ],
  noscript: [
    {
      children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P3SKLNGR" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    }
  ]
});

onMounted(() => {
  const wow = new window.WOW();
  wow.init();
});
</script>

<template>
  <NuxtLayout>
    <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-P3SKLNGR"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->

    <ClientOnly>
      <NuxtLoadingIndicator
        :color="$colorMode.value === 'dark' ? '#fff' : '#CE1127'"
        :height="5"
      />
    </ClientOnly>

    <NuxtPage />
  </NuxtLayout>
</template>
