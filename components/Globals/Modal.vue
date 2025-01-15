<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: null,
  },
  text: {
    type: String,
    required: false,
    default: null,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
    default: null,
  },
  special: {
    type: Boolean,
    required: false,
    default: false,
  },
  hideClose: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(["close", "handleClick"]);

onMounted(() => {
  setTimeout(() => {
    document.body.classList.add("overflow-hidden");
  }, 10);
});

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
});
</script>

<template>
  <div
    class="fixed start-0 top-0 z-[1000] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,.5)] p-3 md:p-5 lg:p-0"
    @click="
      () => {
        if (!disabled) {
          emits('close');
        }
      }
    "
  >
    <div
      @click.stop
      class="relative max-h-[95vh] min-h-[100px] w-full overflow-y-auto overflow-x-hidden rounded-[24px] border border-transparent bg-white p-3 dark:border-[#1C1C21] dark:bg-[#0B0909] md:p-7"
      :class="width || 'lg:w-[700px]'"
    >
      <template v-if="special">
        <button
          v-if="!hideClose"
          type="button"
          class="absolute end-5 top-5 flex size-[30px] items-center justify-center rounded-full border border-transparent bg-white dark:border-[#1C1C21] dark:bg-[#0B0202] md:size-[50px]"
          @click="emits('close')"
        >
          <ClientOnly>
            <img
              v-if="$colorMode.value === 'light'"
              src="/globals/icons/close-dark.svg"
              alt="close-dark-image"
              :draggable="false"
              class="w-[18px] md:w-[25px]"
            />

            <img
              v-else
              src="/globals/icons/close-light.svg"
              alt="close-light-image"
              :draggable="false"
              class="w-[18px] md:w-[25px]"
            />
          </ClientOnly>
        </button>

        <slot />
      </template>

      <template v-else>
        <ClientOnly>
          <div class="absolute end-0 top-0 z-10">
            <img
              v-if="$colorMode.value === 'light'"
              src="/globals/modal/light-top-image.svg"
              alt="light-modal-image"
              :draggable="false"
            />

            <img
              v-else
              src="/globals/modal/dark-top-image.svg"
              alt="dark-modal-image"
              :draggable="false"
            />
          </div>
        </ClientOnly>

        <div class="relative z-20">
          <div class="mb-7 flex items-start justify-between">
            <div class="flex flex-col items-start">
              <ClientOnly>
                <template v-if="$colorMode.value === 'light'">
                  <img
                    src="/logo/light.svg"
                    class="h-full w-full object-contain"
                    alt="light-logo"
                    :draggable="false"
                  />
                </template>

                <img
                  v-else
                  src="/logo/dark.svg"
                  class="h-full w-full object-contain"
                  alt="light-logo"
                  :draggable="false"
                />
              </ClientOnly>

              <h5 class="mb-2 mt-5 text-lg font-medium">{{ title }}</h5>

              <p v-if="text" class="text-text-dark dark:text-text-light">
                {{ text }}
              </p>
            </div>

            <button
              type="button"
              class="flex size-[50px] items-center justify-center rounded-full border border-transparent bg-white dark:border-[#1C1C21] dark:bg-[#0B0202]"
              @click="emits('close')"
            >
              <ClientOnly>
                <img
                  v-if="$colorMode.value === 'light'"
                  src="/globals/icons/close-dark.svg"
                  alt="close-dark-image"
                  :draggable="false"
                />

                <img
                  v-else
                  src="/globals/icons/close-light.svg"
                  alt="close-light-image"
                  :draggable="false"
                />
              </ClientOnly>
            </button>
          </div>

          <slot />
        </div>
      </template>
    </div>
  </div>
</template>
