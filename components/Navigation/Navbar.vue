<script setup>
import * as yup from "yup";
import { configure } from "vee-validate";
import { useToast } from "vue-toastification";
import VOtpInput from "vue3-otp-input";

configure({
  validateOnBlur: true,
  validateOnInput: true,
  validateOnChange: true,
  validateOnModelUpdate: true,
});

const localePath = useLocalePath();

const i18n = useI18n();

/* Start of the media menu */
const mediaMenu = ref(false);
/* End of the media menu */

/* Change language modal */
const changeLanguage = ref(false);
/* End of the change language modal */
</script>

<template>
  <!-- Start of the media menu -->
  <Teleport to="body">
    <GlobalsBackground v-if="mediaMenu" @close="mediaMenu = false" />

    <Transition name="translate">
      <NavigationMediaMenu v-if="mediaMenu" @close="mediaMenu = false" />
    </Transition>
  </Teleport>
  <!-- End of the media menu -->

  <!-- Change language modal -->
  <Teleport to="body">
    <GlobalsConfirmModal
      v-if="changeLanguage"
      :title="$t('TITLES.changeLanguage')"
      :text="$t('TEXTS.changeLanguageText')"
      :btnText="$t('BUTTONS.change')"
      @handleClick="
        () => {
          i18n.setLocale(i18n.locale.value === 'ar' ? 'en' : 'ar');
          changeLanguage = false;
        }
      "
      @close="changeLanguage = false"
    />
  </Teleport>
  <!-- End of the change language modal -->

  <nav
    class="sticky top-0 z-40 overflow-hidden border-b border-border-light bg-nav-light py-3.5 shadow-sm dark:border-border-dark dark:bg-nav-dark"
  >
    <div class="container">
      <div class="flex items-center justify-between gap-5">
        <NuxtLink :to="localePath('/')" class="wow fadeInUp block h-[52px]">
          <ClientOnly>
            <img
              v-if="$colorMode.value === 'light'"
              src="/public/logo/egypt-mls-light.svg"
              class="h-full w-[250px] object-contain"
              alt="light-logo"
              :draggable="false"
            />

            <img
              v-else
              src="/public/logo/egypt-mls-dark.svg"
              class="h-full w-[250px] object-contain"
              alt="dark-logo"
              :draggable="false"
            />
          </ClientOnly>
        </NuxtLink>

        <NavigationMenu />

        <div class="hidden items-center gap-3.5 xl:flex">
          <div class="flex items-center gap-2.5">
            <NuxtLink
              :to="localePath('/auth/login')"
              class="wow fadeInUp flex h-[48px] min-w-[130px] items-center justify-center rounded-lg bg-primary px-3 font-medium text-white"
              >{{ $t("BUTTONS.login") }}</NuxtLink
            >

            <NuxtLink
              :to="localePath('/auth/register')"
              class="wow fadeInUp flex h-[48px] min-w-[130px] items-center justify-center rounded-lg bg-sub-bg px-3 font-medium text-white"
              >{{ $t("BUTTONS.register") }}</NuxtLink
            >
          </div>

          <NavigationSwitchMode />

          <button
            type="button"
            class="wow fadeInUp font-medium"
            @click="changeLanguage = true"
          >
            {{ $i18n.locale === "ar" ? "En" : "عربي" }}
          </button>
        </div>

        <div class="mt-2 flex items-center gap-3 xl:hidden">
          <NavigationSwitchMode />

          <button
            type="button"
            class="wow fadeInUp font-medium"
            @click="changeLanguage = true"
          >
            {{ $i18n.locale === "ar" ? "En" : "عربي" }}
          </button>

          <button
            type="button"
            class="wow fadeInUp text-xl"
            @click="mediaMenu = true"
          >
            <font-awesome-icon icon="fa-solid fa-bars" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.translate-enter-active,
.translate-leave-active {
  transition: transform 0.3s ease-in-out;
}

body[dir="rtl"] {
  .translate-enter-from,
  .translate-leave-to {
    transform: translateX(100%);
  }
}
body[dir="ltr"] {
  .translate-enter-from,
  .translate-leave-to {
    transform: translateX(-100%);
  }
}
</style>
