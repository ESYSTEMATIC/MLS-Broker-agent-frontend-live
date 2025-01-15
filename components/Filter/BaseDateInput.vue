<template>
  <div class="input-wrapper-db !overflow-visible">
    <VueDatePicker
      v-model="date"
      format="yyyy-MM-dd"
      :dark="$colorMode.value === 'dark'"
      :placeholder="placeholder"
      :start-date="startDate || new Date()"
      :disabled-dates="allowedDate"
      @update:model-value="$emit('change', $event)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  value: {
    type: Date,
    required: false,
  },
  startDate: {
    required: false,
  },
  acceptToUp: {
    type: Boolean,
    required: false,
  },
  acceptToDown: {
    type: Boolean,
    required: false,
  },
});

const date = ref(null);

const allowedDate = computed(() => {
  if (props.acceptToUp) {
    return (date) => date < props.disabledDates;
  } else if (props.acceptToDown) {
    return (date) => date > props.disabledDates;
  } else {
    return [];
  }
});

if (props.value) {
  date.value = props.value;
}
</script>

<style lang="scss" scoped></style>
