<script setup>
const i18n = useI18n();
</script>

<template>
  <section class="container relative pt-5 min-h-[845px]">
    <img
      src="/sections/home/bg.svg"
      class="absolute inset-0 block w-full"
      alt="home-image"
      :draggable="false"
    />

    <div class="size-full overflow-hidden p-7">
      <div class="grid grid-cols-12 items-start gap-5">
        <div class="relative col-span-12 h-full gap-3.5 xl:col-span-8">
          <h2
            class="wow fadeInUp mb-10 text-7xl font-semibold leading-[80px] text-white"
          >
            {{ $t("TITLES.homeTitle") }}
          </h2>

          <p
            class="wow fadeInUp font-medium text-text-light dark:text-text-dark"
          >
            {{ $t("TEXTS.aboutText") }}
          </p>
        </div>

        <div class="wow fadeInUp col-span-12 flex justify-end xl:col-span-4">
          <img
            src="/sections/home/spinner.svg"
            class="spin-animate"
            alt="discover-more-image"
            :draggable="false"
          />
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 w-[424px] py-20 pe-10 ps-7 pt-12 text-white"
      :class="i18n.locale.value === 'ar' ? 'start-0' : 'end-0'"
    >
      <h5 class="mb-5 text-xl font-semibold">{{ $t("TITLES.aboutTitle") }}</h5>

      <p
        class="wow fadeInUp line-clamp-7 mb-7 mt-5 text-base font-medium text-text-light dark:text-text-dark"
        :title="$t('TEXTS.aboutText')"
      >
        {{ $t("TEXTS.aboutText") }}
      </p>
    </div>
  </section>
</template>

<style lang="scss">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin-animate {
  animation: spin 15s linear infinite;
}
</style>
