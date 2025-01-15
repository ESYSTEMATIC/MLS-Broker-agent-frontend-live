<template>
  <div>
    <VeeField :name="name" type="text" v-slot="{ meta }">
      <label
        v-if="label"
        :for="name"
        class="text-subtitle mb-2 inline-block"
        :class="[!meta.valid && meta.touched && 'text-error']"
      >
        {{ label }}
      </label>

      <div
        class="input-phone-wrapper"
        :class="`${
          !meta.valid && meta.touched && '!border-error text-error'
        } ${classes} ${disabled ? 'disabled' : ''}`"
      >
        <Listbox v-model="selectedCountry">
          <div class="relative">
            <ListboxButton
              class="relative flex !h-full w-[80px] items-center justify-center border-e sm:text-sm"
            >
              <span class="flex items-center gap-1 truncate">
                <img
                  :src="selectedCountry?.flag"
                  :alt="selectedCountry?.title"
                  class="w-[25px]"
                />
                <span> +{{ selectedCountry.phone_code }} </span>
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-[100] mt-4 max-h-40 w-[100px] overflow-auto rounded-md bg-white text-base shadow-lg dark:bg-boxDB-dark sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="country in countries"
                  :key="country.title"
                  :value="country"
                  as="template"
                >
                  <li class="relative w-full cursor-pointer select-none p-2">
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'flex items-center gap-1 truncate',
                      ]"
                    >
                      <img
                        :src="country.flag"
                        :alt="country.title"
                        class="w-[25px]"
                      />
                      <span> +{{ country.phone_code }} </span>
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <input
          v-model="phone_number"
          type="number"
          :name="name"
          :id="name"
          :class="[
            !meta.valid &&
              meta.touched &&
              'border-error text-error placeholder:text-error',
          ]"
          class="appearance-none !px-3"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="$emit('update:value', $event.target.value)"
        />
      </div>
      <VeeErrorMessage
        v-if="!meta.valid && meta.touched"
        class="text-sm text-error"
        :name="name"
      />
    </VeeField>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useField } from "vee-validate";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { useStore } from "~/store/index";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  value: {
    required: false,
  },
});

const store = useStore();

const { countries } = storeToRefs(store);
const selectedCountry = ref(null);
const phone_number = ref(null);

watch(
  () => countries.value,
  (arr) => {
    if (arr.length) {
      selectedCountry.value = arr[0];
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

const inputField = useField(props.name);

watch(
  () => selectedCountry.value,
  (val) => {
    let obj;

    if (val) {
      obj = {
        phone_number: phone_number.value,
        phone_code: val.phone_code,
        phone_limit: val.phone_limit,
      };

      inputField.setValue(obj);
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

watch(
  () => phone_number.value,
  (val) => {
    let obj;
    obj = {
      phone_number: val,
      phone_code: selectedCountry.value?.phone_code,
      phone_limit: selectedCountry.value?.phone_limit,
    };
    inputField.setValue(obj);
  },
  { deep: true, immediate: true },
);

// =================================================================
watch(
  () => props.value,
  (val) => {
    if (val) {
      selectedCountry.value = countries.value.find(
        (country) => country.phone_code === val.phone_code,
      );
      phone_number.value = val.phone_number;

      let obj = {
        phone_number: val.phone_number,
        phone_code: selectedCountry.value?.phone_code,
        phone_limit: selectedCountry.value?.phone_limit,
      };
      inputField.setValue(obj);
    }
  },
  { deep: true, immediate: true },
);
</script>

<style lang="scss">
.input-phone-wrapper {
  @apply relative flex h-[48px] items-center rounded-lg border border-inputBg-light bg-[#F8F9F9] transition-all dark:border-inputBg-dark dark:bg-transparent;
  input {
    @apply h-full flex-grow appearance-none border-none bg-transparent font-medium focus:outline-none dark:placeholder:text-[#414141];
  }
}
</style>
