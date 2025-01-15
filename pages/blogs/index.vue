<script setup>
const i18n = useI18n();

useHead({
  title: i18n.t("TITLES.blogs"),
});

const blogs = [
  {
    image: "/sections/blogs/1.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/2.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/3.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/1.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/2.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/3.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/1.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/2.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
  {
    image: "/sections/blogs/3.svg",
    title: "More Than a House: The Emotional Benefits of Homeownership",
    text: "With all the headlines and talk about housing affordability, it can be tempting to get lost in the financial side of buying a home.",
    created_at: "September 2021",
  },
];
</script>

<template>
  <div class="container py-10">
    <h3
      class="wow fadeInUp mb-3 text-lg font-bold xl:mb-10 xl:text-7xl xl:leading-[100px]"
    >
      {{ $t("TITLES.ourBlogs") }}
    </h3>

    <p
      class="wow fadeInUp mb-7 w-full text-text-dark dark:text-text-light xl:mb-12 xl:w-[70%] xl:font-medium xl:leading-8"
    >
      {{ $t("TEXTS.blogsText") }}
    </p>

    <div class="grid grid-cols-12 gap-5">
      <div
        v-for="(blog, i) in blogs"
        :key="i"
        class="md:col-pan-6 col-span-12 mb-5 h-[500px] lg:h-[750px] xl:col-span-4"
      >
        <CardsBlogCard :data="blog" />
      </div>
    </div>
  </div>
</template>
