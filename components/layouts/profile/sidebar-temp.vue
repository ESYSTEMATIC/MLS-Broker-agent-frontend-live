<template>
  <div class="relative h-full select-none bg-black md:bg-transparent">
    <div
      class="mb-6 flex h-[80px] items-center"
      :class="!isMediumAndHovered ? '' : ''"
    >
      <NuxtLink
        v-show="!isMediumAndHovered"
        class="block"
        :to="localePath('/profile')"
      >
      <!-- <GlobalsFullLightLogo></GlobalsFullLightLogo> -->

        <!-- <img
          v-show="$colorMode.value === 'light'"
          src="/public/logo/egypt-mls-light.svg"
          alt="logo"
          class="h-[60px] w-full object-contain"
          draggable="false"
        /> -->

        <img
          src="/public/logo/egypt-mls-dark.svg"
          alt="logo"
          class="h-[60px] ml-5 w-[200px] object-cover"
          draggable="false"
        />
      </NuxtLink>

      <NuxtLink
        v-show="isMediumAndHovered"
        class="mb-6 mt-5 flex items-center justify-center"
        :to="localePath('/profile')"
      >
        <!-- <img
          src="/profile/egy_sm_logo_light.svg"
          alt="logo-lms"
          draggable="false"
        /> -->
        <img
          src="/profile/egy_sm_logo_dark.svg"
          alt="logo-lms"
          draggable="false"
        />
      </NuxtLink>
    </div>

    <ul class="links mb-0 md:mb-2">
      <li
        v-for="link in sideLinks"
        :key="link.name"
        class="flex items-center px-4 py-[7px]"
      >
        <NuxtLink
          v-if="link.type == 'link'"
          :to="link.to ? localePath(link.to) : ''"
          class="flex h-[45px] w-full items-center py-3 rounded-lg px-2 text-base font-medium"
        >
          <!-- <img
            v-show="
              ($route.path.endsWith('/')
                ? $route.path.slice(0, -1)
                : $route.path) === link.to
            "
            :src="link.activeIcon"
            :alt="link.name"
            class="me-2 h-[20px] w-[20px]"
            draggable="false"
          />
          <img
            v-show="
              ($route.path.endsWith('/')
                ? $route.path.slice(0, -1)
                : $route.path) !== link.to
            "
            :src="link.icon"
            :alt="link.name"
            class="me-2 h-[20px] w-[20px]"
            draggable="false"
          /> -->
          <span v-if="!isMediumAndHovered" class="px-2 truncate font-medium">
            {{ link.name }}
          </span>
        </NuxtLink>

        <div v-else-if="link.type == 'menu'" class="w-full">
          <button
            @click="
              activeBtn == link.name
                ? (activeBtn = null)
                : (activeBtn = link.name)
            "
            class="relative flex h-[40px] w-full items-center rounded-lg px-2 text-sm font-medium"
            :class="activeBtn == link.name && 'active-btn'"
          >
            <img
              v-show="activeBtn == link.name"
              :src="link.activeIcon"
              :alt="link.name"
              class="me-2 h-[20px] w-[20px]"
              draggable="false"
            />
            <img
              v-show="activeBtn !== link.name"
              :src="link.icon"
              :alt="link.name"
              class="me-2 h-[20px] w-[20px]"
              draggable="false"
            />
            <span v-if="!isMediumAndHovered" class="truncate font-semibold">
              {{ link.name }}
            </span>

            <img
              v-show="activeBtn == link.name && !isMediumAndHovered"
              src="/profile/icons/sidebar/arrow-down-active.svg"
              alt="arrow"
              class="absolute end-3 top-1/2 -translate-y-1/2"
            />
            <img
              v-show="activeBtn !== link.name && !isMediumAndHovered"
              src="/profile/icons/sidebar/arrow-down.svg"
              alt="arrow"
              class="absolute end-3 top-1/2 -translate-y-1/2"
            />
          </button>

          <ul v-if="activeBtn == link.name" class="ms-[30px] pt-3 duration-300">
            <li v-for="item in link.categories" :key="item.to">
              <NuxtLink
                :to="
                  !item.to.includes('forms-library') ? localePath(item.to) : ''
                "
                class="block w-full !bg-transparent py-2 text-sm transition-all hover:text-primary"
              >
                <span v-if="!isMediumAndHovered" class="truncate">
                  {{ item.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <div v-if="!isMediumAndHovered" class="block px-4 py-2 md:hidden">
      <NavigationSwitchMode />
    </div>

    <div class="flex md:hidden absolute bottom-30 w-full px-4 py-2 md:bottom-1">
      <button
        @click="logoutModal = true"
        type="button"
        class="flex h-[40px] w-full items-center justify-center rounded-lg px-2 text-sm font-medium"
      >
        <img
          src="/profile/icons/sidebar/logout.svg"
          alt="logout"
          class="me-2 size-[20px] rtl:rotate-180"
          draggable="false"
        />

        <span class="font-bold text-[#ca0f26]" v-if="!isMediumAndHovered">
          {{ $t("TITLES.logout") }}
        </span>
      </button>
    </div>
  </div>

  <Teleport to="body">
    <GlobalsConfirmModal
      v-if="logoutModal"
      :title="$t('TITLES.logout')"
      :text="$t('TEXTS.logoutText')"
      :btnText="$t('BUTTONS.logout')"
      :loading="logoutLoading"
      @handleClick="handleLogout"
      @close="logoutModal = false"
    />
  </Teleport>
</template>

<script setup>
import { useStore } from "@/store/index.js";

const store = useStore();

const localePath = useLocalePath();

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const sideLinks = [
  {
    name: t("NAV.profile"),
    icon: "/profile/icons/sidebar/dashboard.svg",
    activeIcon: "/profile/icons/sidebar/dashboard-active.svg",
    to: "/profile",
    type: "link",
  },
  {
    name: t("NAV.products_services"),
    icon: "/profile/icons/sidebar/dashboard.svg",
    activeIcon: "/profile/icons/sidebar/dashboard-active.svg",
    to: "/profile/products-services",
    type: "link",
  },
  {
    name: t("NAV.inbox"),
    icon: "/profile/icons/sidebar/dashboard.svg",
    activeIcon: "/profile/icons/sidebar/dashboard-active.svg",
    to: "/profile/inbox",
    type: "link",
  },
  {
    name: t("NAV.contacts"),
    icon: "/profile/icons/sidebar/dashboard.svg",
    activeIcon: "/profile/icons/sidebar/dashboard-active.svg",
    to: "/profile/contacts",
    type: "link",
  },
  {
    name: t("NAV.reviewRequests"),
    icon: "/profile/icons/sidebar/dashboard.svg",
    activeIcon: "/profile/icons/sidebar/dashboard-active.svg",
    to: "/profile/reviews",
    type: "link",
  },
  {
    name: t("NAV.reports"),
    icon: "/profile/icons/sidebar/dashboard.svg",
    activeIcon: "/profile/icons/sidebar/dashboard-active.svg",
    to: "/profile/reports",
    type: "link",
  },
  {
    name: t("NAV.invoices"),
    icon: "/profile/icons/sidebar/invoice.svg",
    activeIcon: "/profile/icons/sidebar/invoice-active.svg",
    to: "/profile/invoices",
    type: "link",
  },
  {
    name: t("NAV.listing_token"),
    icon: "/profile/icons/sidebar/coins.svg",
    activeIcon: "/profile/icons/sidebar/coins-active.svg",
    to: "/profile/listing-token",
    type: "link",
  },
  // {
  //   name: t("NAV.installments"),
  //   icon: "/profile/icons/sidebar/dollar.svg",
  //   activeIcon: "/profile/icons/sidebar/dollar-active.svg",
  //   to: "/profile/installments",
  //   to: "",
  //   type: "link",
  // },
  {
    name: t("NAV.membership_renewal"),
    icon: "/profile/icons/sidebar/medal.svg",
    activeIcon: "/profile/icons/sidebar/medal-active.svg",
    to: "/profile/membership-renewal",
    type: "link",
  },
  {
    name: t("NAV.help"),
    icon: "/profile/icons/sidebar/faq.svg",
    activeIcon: "/profile/icons/sidebar/faq-active.svg",
    type: "menu",
    categories: [
      {
        name: t("NAV.learning_videos"),
        to: "/profile/help/learning-videos",
        // to: "",
      },
      // {
      //   name: t("NAV.forms_library"),
      //   to: "/profile/help/forms-library",
      // },
    ],
  },
];

const activeBtn = ref(null);

watch(
  () => route.path,
  (path) => {
    activeBtn.value = null;
    let menus = sideLinks.filter((menu) => menu.type == "menu");
    menus.forEach((menu) => {
      menu.categories.map((category) => {
        if (path.includes(category.to)) {
          activeBtn.value = menu.name;
          return;
        }
      });
    });
  },
  { deep: true, immediate: true },
);

const isMediumAndHovered = computed(() => store.isMedium && !store.isHovered);

/* Start of the function that handle logout */
const logoutModal = ref(false);

const token = useCookie("mls_egypt_token");

const logoutLoading = ref(false);
function handleLogout() {
  logoutLoading.value = true;

  token.value = null;

  location.href = "http://www.egymls.com";
}
/* End of the function that handle logout */
</script>

<style lang="scss" scoped>
.links {
  a {
    @apply text-white transition-all hover:bg-[#FFFFFF1A] dark:text-gray-300 hover:dark:bg-[#CE11271A];
  }
  .router-link-active {
    &.router-link-exact-active {
      @apply bg-[#000] text-primary dark:bg-[#CE11271A];
    }
  }
  button {
    @apply text-gray-500 transition-all dark:text-gray-300;
    &:hover {
      @apply bg-[#000] dark:bg-[#CE11271A];
    }
    &.active-btn {
      @apply bg-[#000] text-primary dark:bg-[#CE11271A];
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
