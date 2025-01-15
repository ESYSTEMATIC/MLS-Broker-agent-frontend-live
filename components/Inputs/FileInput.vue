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
  type: {
    type: String,
    required: false,
    default: "text",
  },
});

const fileSchema = useField(props.name);

function handleChange(e) {
  if (e.target.files.length) {
    fileSchema.setValue(e.target.files[0].name);
  }
}
</script>

<template>
  <VeeField as="div" :name="name" v-slot="{ meta }">
    <label
      v-if="label"
      class="mb-2 block font-medium"
      :class="meta.touched && !meta.valid && 'text-error'"
      >{{ label }}</label
    >

    <label
      :for="id"
      class="flex h-[48px] w-full cursor-pointer select-none items-center justify-between rounded-lg border border-dashed bg-[#F8F9F9] px-3 font-light dark:bg-transparent"
      :class="[
        meta.touched && !meta.valid
          ? 'border-error text-error'
          : 'border-inputBg-light dark:border-inputBg-dark dark:text-[#414141]',
        fileSchema.value.value && 'border-primary',
      ]"
    >
      <input
        type="file"
        :id="id"
        @change="handleChange"
        :accept="type"
        class="hidden"
      />

      <span v-if="fileSchema.value?.value">{{
        fileSchema.value.value.name || fileSchema.value.value
      }}</span>
      <span v-else>{{ placeholder }}</span>

      <img
        v-if="fileSchema.value.value"
        src="/globals/icons/success.svg"
        alt="success"
      />
      <img
        v-else-if="meta.touched && !meta.valid"
        src="/globals/icons/error.svg"
        alt="error"
      />
      <ClientOnly v-else>
        <img
          v-if="$colorMode.value === 'light'"
          src="/globals/icons/file-light.svg"
          alt="file-light-image"
        />
        <img
          v-else
          src="/globals/icons/file-dark.svg"
          alt="file-dark-image"
        />
      </ClientOnly>
    </label>

    <VeeErrorMessage
      v-if="meta.touched && !meta.valid"
      :name="name"
      as="p"
      class="mt-1 px-3 text-sm text-error xl:text-base"
    />
  </VeeField>
</template>
