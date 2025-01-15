<script setup>
defineProps({
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
  classes: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <VeeField as="div" :name="name" v-slot="{ field, meta }">
    <label
      v-if="label"
      :for="id"
      class="mb-2 block font-medium"
      :class="meta.touched && !meta.valid && 'text-error'"
      >{{ label }}</label
    >

    <div class="relative flex items-center justify-between">
      <textarea
        v-bind="field"
        :placeholder="placeholder"
        class="block max-h-[200px] min-h-[100px] w-full rounded-lg border border-inputBg-light bg-[#F8F9F9] p-3 px-3 dark:border-inputBg-dark dark:bg-transparent dark:placeholder:text-[#414141]"
        :class="[
          meta.touched &&
            !meta.valid &&
            '!border-error text-error placeholder:!text-error',
          classes,
        ]"
      />
    </div>

    <VeeErrorMessage
      v-if="meta.touched && !meta.valid"
      :name="name"
      as="p"
      class="mt-1 px-3 text-sm text-error xl:text-base"
    />
  </VeeField>
</template>
