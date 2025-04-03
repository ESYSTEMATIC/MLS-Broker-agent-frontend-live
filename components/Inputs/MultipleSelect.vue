<script setup>
import { ref, watch, computed } from "vue";
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
    type: Array,
    required: true,
    default: () => [],
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
  is_multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const fieldName = useField(props.name);

// Handle single or multiple selections
const selected = ref(props.is_multiple ? [] : null);

watch(
  () => props,
  (value) => {
    if (value) {
      if (value.reset) {
        fieldName.resetField();
        selected.value = props.is_multiple ? [] : null;
        emits("fieldReset");
      }
      if (value.defaultValue) {
        selected.value = props.is_multiple ? [...value.defaultValue] : value.defaultValue;
      }
    }
  },
  { immediate: true, deep: true }
);

watch(selected, (value) => {
  if (props.is_multiple) {
    const selectedOptions = props.options.filter((item) => value.includes(item.name));
    fieldName.setValue(selectedOptions.map((item) => item.id));
    emits("select", selectedOptions.map((item) => item.id));
  } else {
    const option = props.options.find((item) => item.name === value);
    if (option) {
      fieldName.setValue(option.id);
      emits("select", option.id);
    }
  }
});

// Display text for multiple selected items
const selectedText = computed(() => {
  if (props.is_multiple) {
    return selected.value.length ? selected.value.join(", ") : props.placeholder;
  }
  return selected.value ? selected.value : props.placeholder;
});
</script>

<template>
  <VeeField as="div" :ref="`${props.name}Ref`" :name="name" v-slot="{ meta, field }">
    <label
      v-if="label"
      class="mb-2 block font-medium"
      :class="meta.touched && !meta.valid ? '!text-error' : 'text-text'"
    >
      {{ label }}
    </label>

    <Listbox
      v-slot="{ open }"
      v-model="selected"
      :multiple="is_multiple"
      :disabled="loading || disabled || !options.length"
    >
      <div class="relative w-full" :class="(loading || disabled) && 'opacity-60'">
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
            :class="[dark && 'dark:!text-text-dark', selectedText && 'text-title']"
            :title="selectedText"
          >
            {{ selectedText }}
          </span>

          <span class="absolute end-[10px] top-[20px] flex items-center">
            <font-awesome-icon
              :icon="`fa-solid fa-angle-${open ? 'up' : 'down'}`"
              :class="`text-sm ${
                meta.touched && !meta.valid ? 'text-error' : 'text-text'
              } ${selectedText && 'text-title'}`"
            />
          </span>

          <button
            v-if="clear && selected.length"
            type="button"
            class="absolute end-[35px] text-error"
            @click.stop="
              fieldName.resetField();
              selected = is_multiple ? [] : null;
            "
          >
            <font-awesome-icon icon="fa-solid fa-close" />
          </button>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions
            v-if="options.length"
            class="absolute z-[1010] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-inputBg-dark"
            v-bind="field"
          >
            <ListboxOption
              as="template"
              v-slot="{ active, selected: isSelected }"
              v-for="option in options"
              :key="option.id"
              :value="option.name"
            >
              <li
                class="cursor relative cursor-pointer select-none border-b border-border-light px-4 py-2 duration-300 last-of-type:border-none hover:bg-inputBg-light dark:border-border-dark dark:hover:bg-inputBg-dark"
                :class="{ 'bg-inputBg-light dark:bg-inputBg-dark': active }"
                :title="option.name"
              >
                <span class="block truncate font-medium">{{ option.name }}</span>

                <span v-if="isSelected" class="absolute inset-y-0 left-0 flex items-center text-primary">
                  ✔
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>

          <p v-else class="mt-1 text-center text-text-light dark:text-text-dark">
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
