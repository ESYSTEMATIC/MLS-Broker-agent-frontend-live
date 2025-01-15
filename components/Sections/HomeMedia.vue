<script setup></script>

<template>
  <section class="container pt-7 overflow-hidden text-white">
    <div
      class="mb-5 overflow-hidden rounded-[20px] border border-border-light bg-bg-dark dark:border-border-dark"
    >
      <div class="px-3 py-5">
        <h2 class="wow fadeInUp mb-5 text-xl font-bold">
          {{ $t("TITLES.discoverJourney") }}
        </h2>

        <p class="wow fadeInUp mb-7 text-sm">
          {{ $t("TEXTS.homeText") }}
        </p>
      </div>

      <img
        class="wow fadeInUp relative -bottom-[5px] -end-[8px] min-h-[220px] w-full"
        src="/sections/home/company.svg"
        alt="home-company-image"
        :draggable="false"
      />
    </div>

    <div
      class="rounded-[20px] border border-border-light bg-left-bottom ltr:bg-right-bottom bg-bg-dark bg-[url('/sections/home/about-dark-bg.svg')] bg-no-repeat px-3 py-5 dark:border-border-dark"
    >
      <p class="wow fadeInUp" :title="$t('TEXTS.aboutText')">
        {{ $t("TEXTS.aboutText") }}
      </p>
    </div>
  </section>
</template>
