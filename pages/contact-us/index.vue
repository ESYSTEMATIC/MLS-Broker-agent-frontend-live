<script setup>
const i18n = useI18n();

useHead({
  title: i18n.t("TITLES.contactUs"),
});
</script>

<template>
  <div class="container py-10">
    <SectionsContactUs titleStyle="xl:text-5xl text-xl" />
  </div>
</template>
