<template>
  <div>
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

    <Teleport to="body">
      <GlobalsBackground
        v-if="showNotificationsModal"
        @close="showNotificationsModal = false"
      />

      <transition name="translateXIn">
        <GlobalsNotificationsModal
          v-if="showNotificationsModal"
          @close="showNotificationsModal = false"
        />
      </transition>
    </Teleport>

    <div
      class="mb-10 hidden flex-wrap items-center justify-between gap-5 md:flex"
    >
      <div class="flex flex-grow items-center gap-2">
        <!-- <div class="input-wrapper-db min-w-[100px] max-w-[450px]">
          <label for="search">
            <img
              src="/profile/icons/search.svg"
              alt="search"
              class="absolute start-3 top-1/2 -translate-y-1/2"
              :draggable="false"
            />
          </label>

          <input
            id="search"
            type="text"
            :placeholder="$t('LABELS.search')"
            class="ps-11"
          />
        </div> -->
      </div>

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="wow fadeInUp font-medium"
          :class="$i18n.locale === 'ar' ? 'font-poppins' : 'font-Din'"
          @click="changeLanguage = true"
        >
          {{ $i18n.locale === "ar" ? "En" : "عربي" }}
        </button>

        <NavigationSwitchMode />

        <!-- <button
          @click="showNotificationsModal = true"
          type="button"
          class="flex size-12 items-center justify-center rounded-full bg-primary bg-opacity-10"
        >
          <img src="/profile/icons/bell.svg" class="dark:invert" />
        </button> -->

        <NuxtLink
          class="flex items-center gap-2"
          :to="localePath('/profile/info')"
        >
          <img
            :src="profileData.image || '/profile/icons/person.jpg'"
            class="size-12 rounded-full object-cover"
          />

          <div>
            <h3 class="font-medium">
              {{ profileData.name }}
            </h3>

            <!-- <div class="my-1 flex items-center gap-1">
              <span>MLS ID:</span>

              <span>#{{ profileData.mls_id }}</span>
            </div> -->

            <p class="text-gray-500">
              <span v-if="profileData.broker">
                {{ $i18n.locale === "ar" ? "وسيط" : "Broker" }}
              </span>

              <span v-else-if="profileData.developer">
                {{ $i18n.locale === "ar" ? "مطور عقارى" : "Developer" }}
              </span>
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="block md:hidden">
      <div class="mb-10 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button
            @click="$event.stopPropagation(), store.setIsShown(!store.isShown)"
            class="flex w-[50px] items-center justify-center py-2 transition-all sm:hidden"
            type="button"
          >
            <font-awesome-icon icon="fa-solid fa-bars" class="text-2xl" />
          </button>

          <!-- <button
            @click="showNotificationsModal = true"
            type="button"
            class="flex size-12 items-center justify-center rounded-full bg-primary bg-opacity-10"
          >
            <img src="/profile/icons/bell.svg" class="dark:invert" />
          </button> -->

          <button
            type="button"
            class="wow fadeInUp font-medium"
            :class="$i18n.locale === 'ar' ? 'font-poppins' : 'font-Din'"
            @click="changeLanguage = true"
          >
            {{ $i18n.locale === "ar" ? "En" : "عربي" }}
          </button>
        </div>

        <NuxtLink
          class="flex items-center gap-2"
          :to="localePath('/profile/info')"
        >
          <!-- <img src="/profile/icons/person.jpg" class="size-12 object-cover rounded-full" /> -->

          <div class="flex items-center gap-2">
            <img
              src="/profile/icons/person.jpg"
              class="size-10 rounded-full object-cover"
            />

            <div class="flex flex-col items-start gap-1">
              <h3 class="mb-1 text-xs font-medium md:text-base">
                {{ profileData.name }}
              </h3>

              <p class="text-xs text-gray-500 md:text-base">
                <span v-if="profileData.broker">
                  {{ $i18n.locale === "ar" ? "وسيط" : "Broker" }}
                </span>

                <span v-else-if="profileData.developer">
                  {{ $i18n.locale === "ar" ? "مطور عقارى" : "Developer" }}
                </span>
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/index";
import { useAuthStore } from "~/store/auth";

const store = useStore();
const i18n = useI18n();

const showNotificationsModal = ref(false);

const changeLanguage = ref(false);

const localePath = useLocalePath();

const authStore = useAuthStore();
const { profileData } = storeToRefs(authStore);
</script>

<style lang="scss" scoped>
[dir="ltr"] {
  .translateXIn-enter-active,
  .translateXIn-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .translateXIn-enter-from,
  .translateXIn-leave-to {
    transform: translateX(100%);
  }
}

[dir="rtl"] {
  .translateXIn-enter-active,
  .translateXIn-leave-active {
    transition: all 0.2s ease;
  }
  .translateXIn-enter-from,
  .translateXIn-leave-to {
    transform: translateX(-100%);
  }
}
</style>
