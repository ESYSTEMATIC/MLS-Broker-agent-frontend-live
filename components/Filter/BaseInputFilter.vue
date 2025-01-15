<template>
  <div class="input-wrapper-db">
    <label v-if="icon" :for="name">
      <img
        :src="`/profile/icons/${icon}.svg`"
        :alt="name"
        class="absolute start-3 top-1/2 -translate-y-1/2"
      />
    </label>

    <input
      :id="name"
      type="text"
      :placeholder="placeholder"
      :class="[icon && 'pe-3 ps-11', prepend && 'pe-11 ps-3']"
      @change="$emit('change', $event)"
      :value="value"
    />

    <label v-if="prepend" :for="name">
      <img
        :src="`/profile/icons/${prepend}.svg`"
        :alt="name"
        class="absolute end-3 top-1/2 -translate-y-1/2"
      />
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  prepend: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>
