<script setup>
defineProps({
  type: {
    type: String,
    required: false,
    default: "button",
  },
  text: {
    type: String,
    required: true,
    default: null,
  },
  disabled: {
    tpe: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <button
    :type="type"
    class="h-[48px] min-w-[130px] rounded-lg px-3 disabled:cursor-not-allowed disabled:opacity-60"
    :disabled="disabled"
    @click="$emit('handleClick')"
  >
    {{ text }}
  </button>
</template>
