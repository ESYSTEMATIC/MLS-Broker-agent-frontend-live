<script setup>
const partners = [
  "/sections/partners/arab-mls.svg",
  "/sections/partners/mp.svg",
  "/sections/partners/core-logic.svg",
];
</script>

<template>
  <section id="partners" class="bg-white dark:bg-transparent">
    <div class="container overflow-hidden pt-7 lg:pb-14 lg:pt-14">
      <h3 class="wow fadeInUp text-lg font-bold uppercase lg:mb-10 xl:text-4xl">
        {{ $t("TITLES.partners") }}
      </h3>

      <div class="grid grid-cols-12 items-center gap-3 lg:gap-5">
        <div
          v-for="(partner, i) in partners"
          :key="i"
          class="col-span-12 flex items-center justify-center md:col-span-6 xl:col-span-4"
        >
          <img
            :src="partner"
            alt="partner-image"
            class="wow fadeInUp size-[160px] object-contain duration-300 hover:-translate-y-3"
            :draggable="false"
          />
        </div>
      </div>
    </div>
  </section>
</template>
