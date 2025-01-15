<script setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { computed, ref, watch } from "vue";

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
  defaultValue: {
    required: false,
    default: "",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: true,
    default: null,
  },
  placeholder: {
    type: String,
    required: true,
    default: null,
  },
});

const emits = defineEmits(["select", "clear", "input"]);

const search = ref("");

const filteredOptions = computed(() => {
  if (search.value) {
    return props.options.filter((option) =>
      option.name.toLowerCase().startsWith(search.value.toLocaleLowerCase()),
    );
  } else {
    return [];
  }
});

const fieldName = useField(props.name);

const selected = ref("");

const button = ref(null);

watch(
  selected,
  (value) => {
    if (value) {
      fieldName.setValue(value.name);
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

watch(
  props,
  (value) => {
    if (value.defaultValue) {
      const option = value.options.find(
        (option) => option.id == value.defaultValue,
      );

      if (option) {
        selected.value = value.options.find(
          (option) => option.id == value.defaultValue,
        );
      }
    } else {
      selected.value = null;
    }
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<template>
  <VeeField as="div" :name="name" v-slot="{ meta, field }">
    <label
      v-if="label"
      class="mb-2 block font-medium"
      :class="meta.touched && !meta.valid ? '!text-error' : 'text-text'"
      >{{ label }}</label
    >

    <Combobox v-model="selected" v-bind="field" v-slot="{ open }">
      <div class="relative">
        <div
          class="relative h-[48px] w-full cursor-default overflow-hidden rounded-lg border"
          :class="
            meta.touched && !meta.valid
              ? 'border-error'
              : 'dark:border-inputBg-dark dark:bg-transparent'
          "
        >
          <ComboboxInput
            class="text-title size-full select-none border-none px-3 pe-[20px] font-medium leading-5 focus:ring-0"
            :class="
              meta.touched && !meta.valid
                ? 'placeholder:text-error'
                : 'placeholder:text-text-light dark:placeholder:text-text-dark'
            "
            :displayValue="(option) => option?.name"
            @change="search = $event.target.value"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="emits('select', selected)"
            @focus="button?.el?.click()"
            @input="emits('input')"
          />

          <ComboboxButton
            class="absolute inset-y-0 end-[10px] flex cursor-text items-center gap-3 text-sm"
            :disabled="disabled"
            ref="button"
            @click.stop
          >
            <button
              v-if="selected"
              type="button"
              @click.stop="
                () => {
                  selected = null;

                  emits('clear');
                }
              "
            >
              <i class="fa-solid fa-close text-text" />
            </button>

            <i
              @click.stop
              :class="`fa-solid fa-angle-${
                open ? 'up' : 'down'
              } text-text text-sm`"
            />
          </ComboboxButton>
        </div>

        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="search = ''"
        >
          <ComboboxOptions
            v-if="filteredOptions.length"
            class="absolute z-[1010] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div
              v-if="filteredOptions.length === 0 && search !== ''"
              class="text-text relative cursor-default select-none px-4 py-2"
            >
              {{ $t("TEXTS.noResultsMatch") }}
            </div>

            <ComboboxOption
              v-for="(option, i) in filteredOptions"
              as="template"
              :key="i"
              :value="option"
              v-slot="{ selected, active }"
            >
              <li
                class="cursor relative cursor-pointer select-none border-b border-border-light px-4 py-2 duration-300 last-of-type:border-none hover:bg-inputBg-light dark:border-border-dark dark:hover:bg-inputBg-dark"
                :class="{
                  'bg-inputBg-light dark:bg-inputBg-dark': active,
                  'text-[#414141]': !active,
                }"
              >
                <span class="block truncate font-medium capitalize">
                  {{ option.name }}
                </span>

                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center"
                  :class="{ 'text-primary': active, 'text-text': !active }"
                />
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

    <VeeErrorMessage
      v-if="!meta.valid && meta.touched"
      :name="name"
      as="div"
      class="mt-1 px-5 !text-sm text-error lg:!text-base"
    />
  </VeeField>
</template>
