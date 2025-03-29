<template>
  <div
    class=" bg-[url('/bgPending.png')] bg-no-repeat min-h-screen"
    :class="locale == 'en' ? 'bg-right-bottom' : 'bg-left-bottom'"
  >
    <div class="h-[100px] flex items-center ms-10">
      <!-- <GlobalsFullLightLogo /> -->
      <img 
      src="/public/logo/egypt-mls-dark.svg"
      class="h-[70px]"
      alt="light-logo"
      :draggable="false"
    />

    <!-- <img
      v-else
      src="/public/logo/egypt-mls-light.svg"
      class="h-[70px]"
      alt="light-logo"
      :draggable="false"
    /> -->
    </div>
    <slot />
  </div>
</template>

<script setup>
const { locale } = useI18n();
</script>

<style lang="scss" scoped></style>
