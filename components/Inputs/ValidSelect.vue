<script setup>
import { ref, watch } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { useField } from "vee-validate";

const emits = defineEmits(["select", "fieldReset"]);

const props = defineProps({
  options: {
    type: Object,
    required: true,
    default: null,
  },
  label: {
    type: String,
    required: false,
    default: "",
  },
  placeholder: {
    type: String,
    required: true,
    default: "",
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  reset: {
    type: Boolean,
    required: false,
    default: false,
  },
  defaultValue: {
    required: false,
    default: null,
  },
  clear: {
    type: Boolean,
    required: false,
    default: false,
  },
  dark: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const fieldName = useField(props.name);

const selected = ref(null);

const options = ref([]);
watch(
  props,
  (value) => {
    if (value) {
      if (value.options) {
        options.value = value.options;
      }

      if (value.reset) {
        fieldName.resetField();

        selected.value = null;

        emits("fieldReset");
      }

      if (value.defaultValue) {
        selected.value = value.defaultValue;
      }
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(selected, (value) => {
  if (value) {
    const option = props.options.find((item) => item.name === value);

    if (option) {
      fieldName.setValue(option.id);

      emits("select", option.id);
    }
  }
});

if (fieldName.value.value) {
  const option = props.options.find(
    (item) => item.id === fieldName.value.value,
  );

  if (option) {
    selected.value = option.name;
  }
}
</script>

<template>
  <VeeField
    as="div"
    :ref="`${props.name}Ref`"
    :name="name"
    v-slot="{ meta, field }"
  >
    <label
      v-if="label"
      class="mb-2 block font-medium"
      :class="meta.touched && !meta.valid ? '!text-error' : 'text-text'"
      >{{ label }}</label
    >

    <Listbox
      v-slot="{ open }"
      v-model="selected"
      :disabled="loading || disabled || !options.length"
    >
      <div
        class="relative w-full"
        :class="(loading || disabled) && 'opacity-60'"
      >
        <ListboxButton
          class="block h-[48px] w-full rounded-lg border border-inputBg-light bg-[#F8F9F9] px-3 dark:border-inputBg-dark dark:bg-transparent dark:placeholder:text-[#414141]"
          :class="[
            dark && '!rounded-3xl !ps-5 dark:!bg-box-container-dark',
            loading || disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            meta.touched && !meta.valid
              ? '!border-error'
              : 'border-inputBg-light dark:border-inputBg-dark',
          ]"
        >
          <span
            class="block truncate !pe-[45px] text-start"
            :class="[
              dark && 'dark:!text-text-dark',
              meta.touched && !meta.valid
                ? '!text-error dark:!text-error'
                : 'text-[#414141]',
              selected && 'text-title',
            ]"
            :title="selected ? selected : ''"
            >{{ selected ? selected : placeholder }}</span
          >

          <span class="absolute end-[10px] top-[20px] flex items-center">
            <font-awesome-icon
              :icon="`fa-solid fa-angle-${open ? 'up' : 'down'}`"
              :class="`text-sm ${
                meta.touched && !meta.valid ? 'text-error' : 'text-text'
              } ${selected && 'text-title'}`"
            />
          </span>

          <button
            v-if="clear && selected"
            type="button"
            class="absolute end-[35px] text-error"
            @click.stop="
              fieldName.resetField();
              selected = null;
            "
          >
            <font-awesome-icon icon="fa-solid fa-close" />
          </button>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            v-if="options.length"
            class="absolute z-[1010] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-inputBg-dark"
            v-bind="field"
          >
            <ListboxOption
              as="template"
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.id"
              :value="option.name"
            >
              <li
                class="cursor relative cursor-pointer select-none border-b border-border-light px-4 py-2 duration-300 last-of-type:border-none hover:bg-inputBg-light dark:border-border-dark dark:hover:bg-inputBg-dark"
                :class="{
                  'bg-inputBg-light dark:bg-inputBg-dark': active,
                  'text-[#414141]': !active,
                }"
                :title="option.name"
              >
                <span class="block truncate font-medium">{{
                  option.name
                }}</span>

                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center"
                  :class="{ 'text-primary': active, 'text-text': !active }"
                />
              </li>
            </ListboxOption>
          </ListboxOptions>

          <p
            v-else
            class="mt-1 text-center text-text-light dark:text-text-dark"
          >
            {{ $t("TEXTS.noOptions") }}
          </p>
        </transition>
      </div>
    </Listbox>

    <VeeErrorMessage
      v-if="!meta.valid && meta.touched"
      :name="name"
      as="div"
      class="mt-1 px-5 !text-sm text-error lg:!text-base"
    />
  </VeeField>
</template>
