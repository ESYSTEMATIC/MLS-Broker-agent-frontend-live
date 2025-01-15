<script setup>
const i18n = useI18n();
</script>

<template>
  <section
    id="portfolio"
    class="container relative mb-20 mt-36 h-[65vh] w-full pt-12 xl:h-[825px]"
  >
    <img
      v-if="i18n.locale.value === 'ar'"
      src="/sections/portfolio/bg-ar.svg"
      class="pointer-events-none absolute start-0 top-0 block w-full select-none object-cover"
      alt="portfolio-image"
      :draggable="false"
    />

    <img
      v-else
      src="/sections/portfolio/bg.svg"
      class="pointer-events-none absolute start-0 top-0 block w-full select-none object-cover"
      alt="portfolio-image"
      :draggable="false"
    />

    <div class="w-auto max-w-[70%]">
      <div class="space-y-5">
        <div class="space-y-3">
          <h5
            class="wow fadeInUp font-medium uppercase text-text-light dark:text-text-dark"
          >
            {{ $t("TITLES.portfolio") }}
          </h5>

          <h2
            class="wow fadeInUp text-xl font-semibold uppercase text-title-light dark:text-title-dark xl:text-3xl"
          >
            {{ $t("TITLES.globalAchievements") }}
          </h2>
        </div>

        <p class="wow fadeInUp text-text-light dark:text-text-dark text-sm font-medium xl:text-base">
          {{ $t("TEXTS.portfolioText") }}
        </p>
      </div>
    </div>

    <div class="absolute bottom-0 start-0 xl:start-7">
      <img
        class="wow fadeInUp pointer-events-none w-[85px] select-none xl:w-fit"
        src="/sections/portfolio/circle.svg"
        alt="light-circle-image"
        :draggable="false"
      />
    </div>

    <div class="absolute bottom-10 end-0 w-[150px] xl:w-[200px]">
      <p
        class="wow fadeInUp text-sm uppercase text-text-light dark:text-text-dark xl:text-base"
      >
        {{ $t("TEXTS.scrollDownToSeeMore") }}
      </p>
    </div>
  </section>
</template>
