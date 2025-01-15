<template>
  <VeeField as="div" :name="name" v-slot="{ field, meta }">
    <div :class="!meta.valid && meta.touched && 'date-error'">
      <label
        v-if="label"
        :for="id"
        class="mb-2 block font-medium"
        :class="!meta.valid && meta.touched && 'text-error'"
      >
        {{ label }}
      </label>

      <div class="input-date !overflow-visible">
        <VueDatePicker
          v-model="date"
          :dark="$colorMode.value === 'dark'"
          :name="name"
          :placeholder="placeholder"
          format="yyyy-MM-dd"
          :id="id"
          v-bind="field"
        />

        <VeeErrorMessage
          v-if="!meta.valid && meta.touched"
          :name="name"
          as="div"
          class="mt-2 text-error"
        />
      </div>
    </div>
  </VeeField>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: null,
  },
  label: {
    type: String,
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    required: true,
    default: null,
  },
  name: {
    type: String,
    required: true,
    default: null,
  },
});
const fieldName = useField(props.name);

const date = ref(null);

if (fieldName.value.value) {
  date.value = new Date(fieldName.value.value);
}
</script>

<style lang="scss">
.input-date {
  @apply relative block h-[48px] w-full rounded-lg border border-inputBg-light bg-[#F8F9F9] dark:border-inputBg-dark dark:bg-transparent dark:placeholder:text-[#414141];
  input {
    @apply absolute bottom-0 end-0 start-0 top-0 border-none bg-transparent px-3;
    & + div {
      @apply hidden;
    }
  }
  .dp__main {
    @apply h-full;
    .dp__input_wrap {
      @apply absolute h-full;
    }
  }
}
</style>
