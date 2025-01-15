<script setup>
const i18n = useI18n();

useHead({
  title: i18n.t("TITLES.blogDetails"),
});
</script>

<template>
  <div class="container py-10 xl:py-20">
    <h3
      class="wow fadeInUp mb-5 text-lg font-medium uppercase xl:mb-7 xl:text-4xl xl:font-bold"
    >
      {{ $t("TITLES.firstBlogTitle") }}
    </h3>

    <p class="wow fadeInUp text-sm xl:text-base">{{ $t("TEXTS.blogText") }}</p>

    <div class="my-5 flex items-center gap-2 xl:my-10">
      <img
        src="/profile/icons/person.jpg"
        class="wow fadeInUp size-[50px] rounded-full object-cover"
        alt="profile-image"
        :draggable="false"
      />

      <div class="flex flex-col items-start gap-1">
        <h6 class="wow fadeInUp font-medium">Karim Ahmed</h6>

        <div class="flex items-center gap-3">
          <img
            src="/globals/icons/calendar-dark.svg"
            class="wow fadeInUp size-[20px]"
            alt="calendar-image"
            :draggable="false"
          />

          <span class="wow fadeInUp text-sm font-medium md:text-base">{{
            `${$t("TEXTS.may")} 2024`
          }}</span>
        </div>
      </div>
    </div>

    <img
      src="/sections/blogs/blog.svg"
      class="wow fadeInUp my-5 block h-[50vh] w-full rounded-xl object-cover xl:my-10 xl:h-[90vh]"
      alt="blog-image"
      :draggable="false"
    />

    <div class="xl:px-12">
      <div class="mb-5 xl:mb-14">
        <h5
          class="wow fadeInUp mb-3 font-medium xl:mb-5 xl:text-xl xl:font-bold"
        >
          {{ $t("TITLES.firstBlogTitle") }}
        </h5>

        <p class="wow fadeInUp text-sm xl:text-base">
          {{ $t("TEXTS.blogText") }}
        </p>
      </div>

      <div class="mb-5 xl:mb-14">
        <h5
          class="wow fadeInUp mb-3 font-medium xl:mb-5 xl:text-xl xl:font-bold"
        >
          {{ $t("TITLES.secondBlogTitle") }}
        </h5>

        <p class="wow fadeInUp text-sm xl:text-base">
          {{ $t("TEXTS.blogText") }}
        </p>
      </div>

      <div>
        <h5
          class="wow fadeInUp mb-3 font-medium xl:mb-5 xl:text-xl xl:font-bold"
        >
          {{ $t("TITLES.thirdBlogTitle") }}
        </h5>

        <p class="wow fadeInUp text-sm xl:text-base">
          {{ $t("TEXTS.blogText") }}
        </p>
      </div>
    </div>
  </div>
</template>
