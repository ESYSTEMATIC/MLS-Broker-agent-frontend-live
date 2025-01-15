<template>
  <div
    class=" bg-[url('/bgPending.png')] bg-no-repeat"
    :class="locale == 'en' ? 'bg-right-bottom' : 'bg-left-bottom'"
  >
    <div class="h-[100px] flex items-center ms-10">
      <img src="/logo/light-arab-mls.svg" alt="logo" />
    </div>
    <slot />
  </div>
</template>

<script setup>
const { locale } = useI18n();
</script>

<style lang="scss" scoped></style>
