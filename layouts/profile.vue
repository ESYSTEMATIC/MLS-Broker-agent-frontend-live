<template>
  <div
    class="profile-layout relative flex font-poppins"
    :class="isSmall ? '' : 'my-4 mx-4 md:my-6 md:mx-3'"
  >
    <transition name="translateXIn">
      <div
        @click="$event.stopPropagation()"
        v-show="isShown"
        class=" fixed z-[999] overflow-hidden transition-all dark:bg-boxDB-dark"
        :class="[
          isMedium && !isHovered ? 'w-[69px]' : 'w-[320px]',
          isSmall
            ? 'h-screen rounded-none'
            : 'h-[calc(100vh-32px)] rounded-2xl md:h-[calc(100vh-48px)]',
        ]"
        @mouseover="() => !store.isSmall && store.setIsHovered(true)"
        @mouseleave="() => !store.isSmall && store.setIsHovered(false)"
      >
        <LayoutsProfileSidebar />
      </div>
    </transition>

    <div
      class="bg-white rounded-2xl min-h-[94vh] p-7 transition-all dark:bg-boxDB-dark"
      :class="!isSmall
          ? 'ms-[85px] w-[calc(100%-85px)] md:ms-[345px] md:w-[calc(100%-256px)]'
          : 'ms-0 w-full'">
      <LayoutsProfileNavbar />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store/index.js";
const store = useStore();
const route = useRoute();

const isMedium = computed(() => store.isMedium);
const isHovered = computed(() => store.isHovered);
const isSmall = computed(() => store.isSmall);
const isShown = computed(() => store.isShown);

const showIsMedium = () => {
  if (window.innerWidth <= 992) {
    store.setIsMedium(true);
  } else {
    store.setIsMedium(false);
    store.setIsShown(true);
  }
};

const showIsSmall = () => {
  if (window.innerWidth <= 640) {
    store.setIsSmall(true);
    store.setIsHovered(true);
  } else {
    store.setIsSmall(false);
    store.setIsHovered(false);
  }
};

watch(
  () => route.path,
  () => {
    if (isMedium.value) {
    }
    if (!isSmall.value) {
      store.setIsHovered(false);
    } else {
      store.setIsShown(false);
    }
  },
  { deep: true },
);
onMounted(() => {
  showIsMedium();
  showIsSmall();
  window.addEventListener("resize", () => {
    showIsMedium();
    showIsSmall();
  });

  window.addEventListener("click", () => {
    if (isSmall.value) {
      store.setIsShown(false);
    }
  });

  if (isSmall.value) {
    store.setIsShown(false);
  }
});
</script>

<style lang="scss">
body {
  @apply bg-[#171717] dark:bg-[#141414];
}
.profile-layout {
  .sidebar {
    box-shadow: 0px 0px 43.3px 0px #00000008;
  }
}

[dir="ltr"] {
  .translateXIn-enter-active,
  .translateXIn-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .translateXIn-enter-from,
  .translateXIn-leave-to {
    transform: translateX(-100%);
  }
}

[dir="rtl"] {
  .translateXIn-enter-active,
  .translateXIn-leave-active {
    transition: all 0.2s ease;
  }
  .translateXIn-enter-from,
  .translateXIn-leave-to {
    transform: translateX(100%);
  }
}
</style>
