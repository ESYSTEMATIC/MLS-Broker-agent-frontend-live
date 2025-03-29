<script setup>
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
  isNumber: {
    type: Boolean,
    required: false,
    default: false,
  },
  isChar: {
    type: Boolean,
    required: false,
    default: false,
  },
  dark: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const inputType = ref(props.type || "text");

function checkIsNumber(e) {
  if (props.isNumber) {
    if (
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode === 8 ||
      e.keyCode === 9 ||
      (e.ctrlKey && e.keyCode === 67) ||
      (e.ctrlKey && e.keyCode === 65) ||
      (e.ctrlKey && e.keyCode === 86) ||
      (e.ctrlKey && e.keyCode === 88)
    ) {
      return;
    } else {
      e.preventDefault();
    }
  } else if (props.isChar) {
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      e.keyCode === 8 ||
      e.keyCode === 9 ||
      e.keyCode === 32 ||
      (e.ctrlKey && e.keyCode === 67) ||
      (e.ctrlKey && e.keyCode === 65) ||
      (e.ctrlKey && e.keyCode === 86) ||
      (e.ctrlKey && e.keyCode === 88)
    ) {
      return;
    } else {
      e.preventDefault();
    }
  }
}
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

    <div
      class="relative flex items-center justify-between"
      :class="dark && 'rounded-3xl dark:bg-box-container-dark'"
    >
      <input
        :id="id"
        :type="inputType"
        v-bind="field"
        :placeholder="placeholder"
        class="block h-[48px] w-full rounded-lg border border-inputBg-light bg-[#F8F9F9] px-3 dark:border-inputBg-dark dark:bg-transparent dark:placeholder:text-[#414141]"
        :class="[
          dark &&
            'ps-5 dark:!rounded-3xl dark:text-title-dark dark:placeholder:text-text-dark',
          meta.touched &&
            !meta.valid &&
            '!border-error !text-error placeholder:!text-error',
          type === 'password' && '!pe-[50px]',
        ]"
        :disabled="disabled"
        @keydown="checkIsNumber"
      />

      <ClientOnly>
        <button
          v-if="type === 'password'"
          type="button"
          class="absolute end-[20px]"
          @click="inputType = inputType === 'text' ? 'password' : 'text'"
          aria-label="copy-password-value"
        >
          <ClientOnly>
            <font-awesome-icon
              :icon="`fa-solid ${inputType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`"
              :class="meta.touched && !meta.valid ? '!text-error' : 'text-text'"
              />
            </ClientOnly>
        </button>
      </ClientOnly>
    </div>

    <VeeErrorMessage
      v-if="meta.touched && !meta.valid"
      :name="name"
      as="p"
      class="mt-1 px-3 text-sm text-error xl:text-base"
    />
  </VeeField>
</template>
