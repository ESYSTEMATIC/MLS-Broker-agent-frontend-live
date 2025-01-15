<script setup></script>

<template>
  <section id="about" class="container mb-10 overflow-hidden py-10 xl:py-5">
    <div class="space-y-5 text-center xl:mt-20">
      <h2
        class="wow fadeInUp text-xl font-bold text-title-light dark:text-title-dark xl:text-3xl"
      >
        {{ $t("TITLES.wordFromOurSeo") }}
      </h2>

      <p
        class="wow fadeInUp mx-auto w-full text-text-dark dark:text-text-light lg:w-3/4 2xl:w-[50%]"
      >
        {{ $t("TEXTS.homeText") }}
      </p>

      <!-- <video width="100%" class="wow fadeInUp rounded-[25px]" loop autoplay>
        <source src="/videos/seo-word.mp4" type="video/mp4" />
      </video> -->
    </div>
  </section>
</template>
