<script setup>
const emits = defineEmits(["close"]);

const i18n = useI18n();

const localePath = useLocalePath();

const links = [
  {
    title: i18n.t("TITLES.home"),
    path: "/",
  },
  {
    title: i18n.t("TITLES.about"),
    path: "/#about",
  },
  {
    title: i18n.t("TITLES.blogs"),
    path: "/#blogs",
  },
  {
    title: i18n.t("TITLES.contactUs"),
    path: "/#contact-us",
  },
];

onMounted(() => {
  document.body.classList.add("overflow-hidden");
});

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
});
</script>

<template>
  <div
    class="fixed start-0 top-0 z-[1200] h-full w-[93%] rounded-e-[35px] bg-bg-dark p-5 lg:w-[300px]"
  >
    <div class="mb-12 flex w-full items-center justify-between">
      <img
        src="/public/logo/egypt-mls-dark.svg"
        class="h-[70px]"
        alt="light-logo"
        :draggable="false"
      />

      <button
        type="button"
        class="flex size-[50px] items-center justify-center rounded-full border border-[#1C1C21] border-transparent bg-[#0B0202]"
        @click="emits('close')"
      >
        <img
          src="/globals/icons/close-light.svg"
          alt="close-light-image"
          :draggable="false"
        />
      </button>
    </div>

    <ul class="mb-10 space-y-5">
      <li v-for="(link, i) in links" :key="i" class="w-full">
        <NuxtLink
          :to="localePath(link.path)"
          class="hover:text-title block w-full rounded-lg border px-5 py-2.5 font-medium text-white duration-300 hover:border-[#CE11271A] hover:bg-[#CE11271A] hover:dark:border-[#CE11271A] hover:dark:bg-[#1D1717]"
          :class="
            $route.fullPath === link.path
              ? '!text-primary dark:border-[#CE11271A] dark:bg-[#1D1717]'
              : 'border-transparent'
          "
          @click="emits('close')"
          >{{ link.title }}</NuxtLink
        >
      </li>
    </ul>

    <div class="space-y-5">
      <NuxtLink
        :to="localePath('/auth/login')"
        class="flex h-[48px] w-full items-center justify-center rounded-lg bg-primary px-3 font-medium text-white"
        >{{ $t("BUTTONS.login") }}</NuxtLink
      >

      <NuxtLink
        :to="localePath('/auth/register')"
        class="flex h-[48px] w-full items-center justify-center rounded-lg bg-sub-bg px-3 font-medium text-white"
        >{{ $t("BUTTONS.register") }}</NuxtLink
      >
    </div>
  </div>
</template>
