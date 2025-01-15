<script setup>
const i18n = useI18n();

const localePath = useLocalePath();

const links = [
  {
    title: i18n.t("TITLES.home"),
    path: localePath("/"),
  },
  {
    title: i18n.t("TITLES.blogs"),
    path: localePath("/#blogs"),
  },
  {
    title: i18n.t("TITLES.contactUs"),
    path: localePath("/#contact-us"),
  },
];
</script>

<template>
  <ul class="hidden items-center gap-7 xl:flex">
    <li v-for="(link, i) in links" :key="i">
      <NuxtLink
        :to="link.path"
        class="wow fadeInUp hover:text-title rounded-lg border px-5 py-2.5 font-medium text-title-light duration-300 hover:border-[#CE11271A] hover:bg-[#CE11271A] dark:text-title-dark hover:dark:border-[#CE11271A] hover:dark:bg-[#1D1717]"
        :class="
          $route.fullPath === link.path
            ? '!text-primary dark:border-[#CE11271A] dark:bg-[#1D1717]'
            : 'border-transparent'
        "
        >{{ link.title }}</NuxtLink
      >
    </li>
  </ul>
</template>
