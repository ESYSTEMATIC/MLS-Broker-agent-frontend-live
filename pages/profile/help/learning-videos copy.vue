<template>
  <div class="w-full">
    <h3 class="mb-8 text-2xl font-bold">
      {{ $t("TITLES.learning_videos") }}
    </h3>

    <div class="grid grid-cols-12 gap-4">
      <div class="order-2 col-span-12 xl:order-1 xl:col-span-10">
        <div
          v-if="currentVideo"
          class="relative"
          @mouseover="videoHovered = true"
          @mouseleave="videoHovered = false"
        >
          <video
            v-if="!loading"
            width="100%"
            class="wow fadeIn h-[50vh] rounded-lg xl:h-[70vh] xl:rounded-[25px]"
            loop
            ref="video"
            autoplay
          >
            <source :src="currentVideo.src[$i18n.locale]" type="video/mp4" />
          </video>

          <button
            v-if="videoHovered"
            @click="playVideo"
            type="button"
            class="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary bg-opacity-35"
          >
            <font-awesome-icon
              v-if="!isPlaying"
              icon="fa-solid fa-pause"
              class="text-2xl text-white"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-play"
              class="text-2xl text-white"
            />
          </button>
        </div>
      </div>

      <div class="order-1 col-span-12 xl:order-2 xl:col-span-2">
        <div
          class="flex w-full gap-5 overflow-x-auto pb-2 xl:block xl:max-h-[70vh] xl:overflow-y-auto xl:overflow-x-hidden xl:pb-0 xl:pe-2"
        >
          <button
            v-for="item in videos"
            :key="item.id"
            type="button"
            class="block h-[130px] min-w-[170px] border-2 xl:mb-4 xl:w-full"
            :class="
              currentVideo?.id == item.id
                ? 'rounded-xl border-primary'
                : 'border-transparent'
            "
            @click="
              isChanged = !isChanged;
              currentVideo = item;
            "
          >
            <video
              class="block !h-full w-full rounded-lg object-cover xl:w-full"
              width="100%"
            >
              <source :src="item.src[$i18n.locale]" type="video/mp4" />
            </video>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const i18n = useI18n();

useHead({
  title: i18n.t("TITLES.learning_videos"),
});

const isChanged = ref(false);

const loading = ref(true);

const isPlaying = ref(true);

watch(
  isChanged,
  () => {
    loading.value = true;

    isPlaying.value = false;

    setTimeout(() => {
      loading.value = false;
    }, 100);
  },
  {
    immediate: true,
  },
);

const videos = ref([
  {
    id: 1,
    src: {
      ar: "https://ui.aait-d.com/mls_videos/Matrix%E2%84%A2%20Search%20Results.mp4",
      en: "https://api.egymls.com/storage/training-material/2023/9/Matrix-3PS-Search-Results-final.mp4",
    },
  },
  {
    id: 2,
    src: {
      ar: "https://ui.aait-d.com/mls_videos/Matrix%E2%84%A2%20Carts.mp4",
      en: "https://api.egymls.com/storage/training-material/2023/9/Matrix-Carts-final.mp4",
    },
  },
  {
    id: 3,
    src: {
      ar: "https://ui.aait-d.com/mls_videos/Matrix%E2%84%A2%20Dashboard%20Timeline.mp4",
      en: "https://api.egymls.com/storage/training-material/2023/9/Matrix-Dashboard-Timeline-final.mp4",
    },
  },
  {
    id: 4,
    src: {
      ar: "https://ui.aait-d.com/mls_videos/Matrix%E2%84%A2%20Drivng%20Directions.mp4",
      en: "https://api.egymls.com/storage/training-material/2023/9/Matrix-Driving-Directions-final.mp4",
    },
  },
  {
    id: 5,
    src: {
      ar: "https://ui.aait-d.com/mls_videos/Matrix%E2%84%A2%20Map%20Search.mp4",
      en: "https://api.egymls.com/storage/training-material/2023/9/Matrix-Map-Search-final.mp4",
    },
  },
  {
    id: 6,
    src: {
      ar: "https://ui.aait-d.com/mls_videos/Matrix%E2%84%A2%20Media%20Privacy%20Settings.mp4",
      en: "https://api.egymls.com/storage/training-material/2023/9/Matrix-Media-Privacy-Settings-final.mp4",
    },
  },
  {
    id: 7,
    src: {
      ar: "https://ui.aait-d.com/mls_videos/Matrix%E2%84%A2%20Listing%20Input.mp4",
      en: "https://api.egymls.com/storage/training-material/2023/9/yt5s.io-Matrix-Input-Listing-Manager-final.mp4",
    },
  },
]);

const currentVideo = ref(null);

const video = ref(null);

const videoHovered = ref(false);

const playVideo = () => {
  if (!isPlaying.value) {
    video.value.pause();
  } else {
    video.value.play();
  }

  isPlaying.value = !isPlaying.value;
};

onMounted(() => {
  currentVideo.value = videos.value[0];
});
</script>
