<script setup>
const colorMode = useColorMode();

function handleSwitchMode() {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
  <button
    type="button"
    aria-labelledby="switch mode"
    class="flex h-[32px] min-w-[60px] select-none flex-row-reverse items-center justify-between gap-2 rounded-2xl bg-[#E2E2E2] px-2 py-1.5 duration-300 dark:flex-row dark:bg-[#444444]"
    @click="handleSwitchMode"
  >
    <ClientOnly>
      <img
        v-if="colorMode.value === 'dark'"
        src="/navbar/dark-mode.svg"
        class="size-[23px] object-contain"
        alt="dark-mode"
        :draggable="false"
      />

      <img
        v-else
        src="/navbar/light-mode.svg"
        class="size-[23px] object-contain"
        alt="light-mode"
        :draggable="false"
      />
    </ClientOnly>

    <span
      class="size-[24px] rounded-full bg-white shadow-[0_6px_6px_-6px,#00000029]"
    />
  </button>
</template>
