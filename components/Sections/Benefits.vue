<script setup>
const i18n = useI18n();

const benefits = [
  {
    image: "/sections/benefits/1.svg",
    title: i18n.t("TITLES.modernizedWorkflow"),
    text: i18n.t("TEXTS.modernizedWorkflowText"),
  },
  {
    image: "/sections/benefits/2.svg",
    title: i18n.t("TITLES.globalExposure"),
    text: i18n.t("TEXTS.modernizedWorkflowText"),
  },
  {
    image: "/sections/benefits/3.svg",
    title: i18n.t("TITLES.effortlessText"),
    text: i18n.t("TEXTS.effortlessText"),
  },
  {
    image: "/sections/benefits/4.svg",
    title: i18n.t("TITLES.tailoredMarket"),
    text: i18n.t("TEXTS.effortlessText"),
  },
];
</script>

<template>
  <section
    id="benefits"
    class="mb-5 mt-20 overflow-hidden bg-[url('/sections/benefits/bg.svg')] bg-cover bg-no-repeat lg:py-20 py-10"
  >
    <div class="container">
      <h3
        class="wow fadeInUp lg:mb-10 mb-7 text-lg font-bold uppercase text-white xl:text-4xl"
      >
        {{ $t("TITLES.matrixBenefits") }}
      </h3>

      <div class="grid grid-cols-12 2xl:gap-x-32 lg:gap-x-20 gap-y-7">
        <div
          v-for="(benefit, i) in benefits"
          :key="i"
          class="col-span-12 lg:col-span-6"
        >
          <CardsBenefitsCard :data="benefit" />
        </div>
      </div>
    </div>
  </section>
</template>
