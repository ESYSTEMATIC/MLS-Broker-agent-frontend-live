<script setup>
const localePath = useLocalePath();

const i18n = useI18n();

const firstLinks = [
  {
    name: i18n.t("TITLES.home"),
    path: "/",
  },
  {
    name: i18n.t("TITLES.about"),
    path: "/#about",
  },
  {
    name: i18n.t("TITLES.globalAchievements"),
    path: "/#portfolio",
  },
];

const secondLinks = [
  {
    name: i18n.t("TITLES.blogs"),
    path: "/#blogs",
  },
  {
    name: i18n.t("TITLES.faqs"),
    path: "/#faqs",
  },
  {
    name: i18n.t("TITLES.contactUs"),
    path: "/#contact-us",
  },
];

/* Start of the email form */
const email = ref("");

const emailLoading = ref(false);
async function handleSendingEmail() {
  if (email.value.trim()) {
  }
}
/* End of the email form */

const socialLinks = ref([
  {
    path: "",
    img: "/globals/icons/facebook.svg",
  },
  {
    path: "",
    img: "/globals/icons/linkedin.svg",
  },
  {
    path: "",
    img: "/globals/icons/twitter.svg",
  },
  {
    path: "",
    img: "/globals/icons/youtube.svg",
  },
]);
</script>

<template>
  <footer class="relative bg-bg-dark text-white xl:mt-12">
    <div class="relative z-20">
      <div
        class="container flex flex-col items-start justify-between gap-7 border-b border-[#171717] py-5 xl:flex-row xl:items-center xl:py-24"
      >
        <div class="flex flex-col items-start gap-3 xl:w-[70%]">
          <h3 class="wow fadeInUp font-medium md:text-xl xl:text-4xl">
            {{ $t("TITLES.footerTitle") }}
          </h3>

          <p class="wow fadeInUp text-sm text-text-dark dark:text-text-light">
            {{ $t("TEXTS.footerText") }}
          </p>
        </div>

        <GlobalsButton
          type="button"
          class="wow fadeInUp rounded-[10px] bg-primary text-white"
          :text="$t('BUTTONS.joinNow')"
        />
      </div>

      <div class="container grid grid-cols-12 items-start gap-7 py-7 xl:py-20">
        <div class="wow fadeInUp col-span-12 xl:col-span-6">
          <NuxtLink :to="localePath('/')" class="mb-5 block min-h-[52px] w-fit">
            <img
              src="/public/logo/egypt-platform-logo-dark.svg"
              class="w-[150px] object-contain"
              alt="egypt-platform-logo"
              :draggable="false"
            />
          </NuxtLink>

          <p class="w-full font-medium leading-7 text-text-light xl:w-[40%]">
            {{ $t("TEXTS.footerSubText") }}
          </p>
        </div>

        <div class="wow fadeInUp col-span-12 xl:col-span-3">
          <FooterLinks :links="firstLinks" />
        </div>

        <div class="wow fadeInUp col-span-12 xl:col-span-3">
          <FooterLinks :links="secondLinks" />
        </div>
      </div>

      <div class="bg-nav-dark py-7 font-medium">
        <div
          class="container flex flex-col items-start justify-between gap-5 xl:flex-row xl:items-center"
        >
          <div
            class="wow fadeInUp flex flex-col items-start gap-5 md:flex-row md:items-center lg:gap-12"
          >
            <span
              >{{ $t("TEXTS.rightsReserved") }} &copy;
              {{ new Date().getFullYear() }}
            </span>

            <NuxtLink
              :to="localePath('/')"
              class="duration-300 hover:scale-105"
              >{{ $t("TITLES.termsConditions") }}</NuxtLink
            >
          </div>

          <div class="flex items-center gap-5">
            <a
              v-for="(item, i) in socialLinks"
              :key="i"
              :href="item.path"
              class="wow fadeInUp flex size-[35px] items-center justify-center rounded-full bg-[#141414] p-2.5 duration-300 hover:-translate-y-2 xl:size-[50px]"
              target="_blank"
            >
              <img :src="item.img" alt="social-image" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <img
      src="/sections/faq/bg-light.svg"
      class="wow fadeInUp absolute bottom-0 end-0 z-10"
      alt="footer-image"
    />
  </footer>
</template>
