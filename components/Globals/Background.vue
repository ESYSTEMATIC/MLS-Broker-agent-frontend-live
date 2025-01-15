<script setup>
const emits = defineEmits(["close"]);
</script>

<template>
  <div
    class="fixed end-0 top-0 z-[1001] size-full bg-[rgba(0,0,0,.5)] shadow-lg"
    @click="emits('close')"
  />
</template>
