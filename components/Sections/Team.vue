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
  1500: {
    slidesPerView: 4,
  },
};

const members = [
  {
    image: "/sections/team/1.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
  {
    image: "/sections/team/2.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
  {
    image: "/sections/team/3.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
  {
    image: "/sections/team/4.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
  {
    image: "/sections/team/1.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
  {
    image: "/sections/team/2.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
  {
    image: "/sections/team/3.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
  {
    image: "/sections/team/4.svg",
    name: "Mohamed Salem",
    position: "General Manager",
  },
];
</script>

<template>
  <section
    class="overflow-y-hidden border-y border-transparent py-12 dark:border-[#2F2F37]"
  >
    <div class="container">
      <GlobalsTitle
        :title="$t('TITLES.outTeam')"
        :text="$t('TEXTS.ourTeamText')"
        class="!mb-10"
        paginateClass="team"
      />

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
          nextEl: '.team-next',
          prevEl: '.team-prev',
        }"
      >
        <SwiperSlide v-for="(item, i) in members" :key="i">
          <CardsTeamCard :data="item" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
