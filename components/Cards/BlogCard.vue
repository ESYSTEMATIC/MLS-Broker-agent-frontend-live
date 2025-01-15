<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: null,
  },
});

const localePath = useLocalePath();
</script>

<template>
  <RouterLink
    :to="localePath(`/blogs/${data.id}`)"
    class="wow fadeInUp relative flex h-full flex-col items-start justify-end overflow-hidden rounded-[16px] bg-cover bg-no-repeat p-3 text-white"
    :style="{ backgroundImage: `url(${data.image})` }"
  >
    <div
      class="absolute start-0 top-0 z-10 size-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent"
    />

    <div class="relative z-20">
      <h5 class="text-title mb-3 text-base font-medium md:text-xl">
        {{ data.title }}
      </h5>

      <p class="my-3 font-light xl:leading-7">{{ data.text }}</p>

      <div class="flex items-center gap-3">
        <img
          src="/globals/icons/calendar.svg"
          class="size-[20px]"
          alt="calendar-image"
          :draggable="false"
        />

        <span class="text-sm font-medium md:text-base">{{
          data.created_at
        }}</span>
      </div>
    </div>
  </RouterLink>
</template>
