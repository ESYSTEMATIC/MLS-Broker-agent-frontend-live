<script setup>
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  992: {
    slidesPerView: 2,
  },
  1200: {
    slidesPerView: 3,
  },
};

const i18n = useI18n();

const faqs = [
  {
    title: i18n.t("TITLES.firstFaqTitle"),
    text: i18n.t("TEXTS.firstFaqText"),
  },
  {
    title: i18n.t("TITLES.secondFaqTitle"),
    text: i18n.t("TEXTS.secondFaqText"),
  },
  {
    title: i18n.t("TITLES.thirdFaqTitle"),
    text: i18n.t("TEXTS.thirdFaqText"),
  },
];
</script>

<template>
  <section id="faqs" class="relative overflow-hidden">
    <div
      class="container relative z-20 border-b border-transparent pb-7 pt-10 dark:border-[#2F2F37] xl:pb-32 xl:pt-20"
    >
      <ClientOnly>
        <GlobalsTitle
          v-if="$colorMode.value === 'light'"
          :title="$t('TITLES.faq')"
          :text="$t('TEXTS.ourTeamText')"
          class="!mb-12"
          link="/"
          paginateClass="faq"
        />

        <div
          v-else
          class="mb-12 flex flex-col items-end justify-between gap-5 xl:flex-row"
        >
          <div class="flex flex-col items-start gap-3">
            <h3 class="wow fadeInUp font-bold uppercase md:text-xl xl:text-4xl">
              {{ $t("TITLES.faq") }}
            </h3>

            <p class="wow fadeInUp text-sm text-text-dark dark:text-text-light">
              {{ $t("TEXTS.ourTeamText") }}
            </p>
          </div>

          <button
            type="button"
            class="wow fadeInUp h-[50px] w-full min-w-[150px] rounded-lg border border-[#CE11271A] bg-[#141313] px-5 text-sm duration-300 hover:bg-primary hover:!text-white dark:text-primary xl:w-fit"
            :aria-labelledby="$t('BUTTONS.viewAllFaqs')"
          >
            {{ $t("BUTTONS.viewAllFaqs") }}
          </button>
        </div>
      </ClientOnly>

      <Swiper
        class="mySwiper"
        :breakpoints="breakpoints"
        spaceBetween="15"
        :modules="[Navigation, Autoplay]"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :navigation="{
          nextEl: '.faq-next',
          prevEl: '.faq-prev',
        }"
      >
        <SwiperSlide v-for="(item, i) in faqs" :key="i">
          <CardsFAQCard :data="item" />
        </SwiperSlide>
      </Swiper>
    </div>

    <img
      v-if="$colorMode.value === 'light'"
      class="wow fadeInUp absolute bottom-0 end-0 z-10"
      src="/sections/faq/bg-light.svg"
      alt="faq-image"
    />

    <img
      v-else
      class="wow fadeInUp absolute bottom-0 end-0 z-10"
      src="/sections/faq/bg-dark.svg"
      alt="faq-image"
    />
  </section>
</template>
