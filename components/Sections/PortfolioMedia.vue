<script setup></script>

<template>
  <section id="portfolio" class="container my-5">
    <img
      src="/sections/portfolio/media.svg"
      class="wow fadeInUp mb-5 block w-full rounded-2xl object-cover"
      alt="media-image"
      :draggable="false"
    />

    <h2
      class="wow fadeInUp mb-3 text-lg font-semibold uppercase text-title-light dark:text-title-dark"
    >
      {{ $t("TITLES.globalAchievements") }}
    </h2>

    <p
      class="wow fadeInUp text-sm xl:text-base"
    >
      {{ $t("TEXTS.portfolioText") }}
    </p>
  </section>
</template>
