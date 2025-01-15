<script setup>
const i18n = useI18n();

const blogs = [
  {
    id: 1,
    image: "/sections/blogs/1.svg",
    title: i18n.t("TITLES.firstBlogTitle"),
    text: i18n.t("TEXTS.blogText"),
    created_at: `${i18n.t("TEXTS.may")} 2024`,
  },
  {
    id: 2,
    image: "/sections/blogs/2.svg",
    title: i18n.t("TITLES.secondBlogTitle"),
    text: i18n.t("TEXTS.blogText"),
    created_at: `${i18n.t("TEXTS.march")} 2024`,
  },
  {
    id: 3,
    image: "/sections/blogs/3.svg",
    title: i18n.t("TITLES.thirdBlogTitle"),
    text: i18n.t("TEXTS.blogText"),
    created_at: `${i18n.t("TEXTS.january")} 2024`,
  },
];
</script>

<template>
  <section id="blogs" class="container mb-10 overflow-hidden pb-5 pt-[85px]">
    <GlobalsTitle :title="$t('TITLES.discoverBlogs')" link="/blogs" />

    <div class="grid grid-cols-12 items-stretch gap-5">
      <div class="col-span-4 hidden h-full xl:block">
        <CardsBlogCard :data="blogs[0]" />
      </div>

      <div class="col-span-8 hidden xl:block">
        <div class="mb-5 h-[380px]">
          <CardsBlogCard :data="blogs[1]" />
        </div>

        <div class="h-[380px] last-of-type:mb-0">
          <CardsBlogCard :data="blogs[2]" />
        </div>
      </div>

      <div
        v-for="(blog, i) in blogs"
        :key="i"
        class="col-span-12 h-[350px] md:col-span-6 lg:h-[380px] xl:hidden"
      >
        <CardsBlogCard :data="blog" />
      </div>
    </div>
  </section>
</template>
