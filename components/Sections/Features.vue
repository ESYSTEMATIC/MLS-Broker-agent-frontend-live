<script setup>
const i18n = useI18n();

const features = [
  {
    image: "/sections/features/1.svg",
    title: i18n.t("TITLES.customizableHotSheet"),
    text: i18n.t("TEXTS.customizableHotSheetText"),
  },
  {
    image: "/sections/features/2.svg",
    title: i18n.t("TITLES.robustCmaFunctionality"),
    text: i18n.t("TEXTS.robustCmaFunctionalityText"),
  },
  {
    image: "/sections/features/3.svg",
    title: i18n.t("TITLES.automatedSearchAlerts"),
    text: i18n.t("TEXTS.automatedSearchAlertsText"),
  },
  {
    image: "/sections/features/4.svg",
    title: i18n.t("TITLES.integratedMappingWithStreetViews"),
    text: i18n.t("TEXTS.integratedMappingWithStreetViewsText"),
  },
];
</script>

<template>
  <section
    id="features"
    class="mb-5 overflow-hidden bg-[url('/sections/features/bg.jpeg')] bg-cover bg-no-repeat py-16 lg:mt-20"
  >
    <div class="container text-white">
      <h3 class="wow fadeInUp text-lg font-bold uppercase xl:text-4xl">
        {{ $t("TITLES.features") }}
      </h3>

      <div class="my-10 grid grid-cols-12 gap-5 lg:gap-10">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="col-span-12 lg:col-span-6"
        >
          <CardsFeaturesCard :data="feature" />
        </div>
      </div>

      <div
        class="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center"
      >
        <h5 class="wow fadeInUp font-medium lg:text-xl">
          {{ $t("TITLES.discoverOurTools") }}
        </h5>

        <button
          type="button"
          class="wow fadeInUp w-full rounded-[16px] border border-[#EEEEEE] bg-[rgba(0,0,0,0.10)] px-12 py-3 text-center text-sm lg:w-auto xl:text-lg"
          :style="{ backdropFilter: 'blur(25px)' }"
        >
          {{ $t("TEXTS.exploreMatrixFeatures") }}
        </button>
      </div>
    </div>
  </section>
</template>
