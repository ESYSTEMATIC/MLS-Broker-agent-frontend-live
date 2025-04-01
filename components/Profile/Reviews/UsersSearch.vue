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
  apiUrl: {
    type: String,
    required: true, // The API URL to fetch options
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
const options = ref([]); // Stores fetched options
const loading = ref(false); // Shows loading state

const selected = ref(null);
const button = ref(null);

const axios = useNuxtApp().$axios;

// Fetch options from API when user types
watch(
  search,
  async (newSearch) => {
    if (!newSearch) {
      options.value = [];
      return;
    }

    try {
      loading.value = true;
      const response = await axios.get(props.apiUrl, {
        params: { search: newSearch }, // Adjust the query parameter based on API requirements
      });
      options.value = response.data.data; // Assume API returns an array of objects
    } catch (error) {
      console.error("Error fetching options:", error);
      options.value = [];
    } finally {
      loading.value = false;
    }
  }
);

// Handle selection
watch(selected, (value) => {
  if (value) {
    emits("select", value);
  }
});
</script>

<template>
  <VeeField as="div" :name="name" v-slot="{ meta, field }">
    <label
      v-if="label"
      class="mb-2 block font-medium"
      :class="meta.touched && !meta.valid ? '!text-error' : 'text-text'"
    >
      {{ label }}
    </label>

    <Combobox v-model="selected" v-bind="field">
      <div class="relative">
        <div
          class="relative h-[48px] w-full cursor-default overflow-hidden rounded-lg border"
          :class="
            meta.touched && !meta.valid
              ? 'border-error'
              : 'dark:border-inputBg-dark dark:bg-transparent'
          "
        >
          <!-- Input -->
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

          <!-- Button -->
          <ComboboxButton class="absolute inset-y-0 end-[10px] flex cursor-text items-center gap-3 text-sm">
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
            <i :class="`fa-solid fa-angle-down text-text text-sm`" />
          </ComboboxButton>
        </div>

        <!-- Dropdown Options -->
        <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <ComboboxOptions
            v-if="options.length || loading"
            class="absolute z-[1010] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div v-if="loading" class="text-gray-500 p-3 text-center">Loading...</div>
            <div v-else-if="options.length === 0 && search" class="text-gray-500 p-3 text-center">
              No results found
            </div>

            <ComboboxOption
              v-for="(option, i) in options"
              :key="i"
              :value="option"
              as="template"
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
                  {{ option.name }} - {{ option.email }} | {{ option.phone }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
          <ComboboxOptions
            v-if="!options.length"
            class="absolute z-[1010] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div class="text-gray-500 p-3 text-center">No Results</div>
          </ComboboxOptions>
        </TransitionRoot>

        <div @click="selected = null" :style="`${$i18n.locale === 'ar' ? 'left : 10px;' : 'right : 10px;'}`" class="absolute cursor-pointer top-[14px]">
          <img
          src="/globals/icons/close-dark.svg"
          alt="close-dark-image"
          :draggable="false"
          class="w-[18px] md:w-[23px]"
          />
        </div>
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
