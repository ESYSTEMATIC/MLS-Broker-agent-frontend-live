<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: null,
  },
  text: {
    type: String,
    required: true,
    default: null,
  },
  btnText: {
    type: String,
    required: true,
    default: "",
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(["close", "handleClick"]);

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
});

onMounted(() => {
  document.body.classList.add("overflow-hidden");
});
</script>

<template>
  <div
    @click="
      () => {
        if (!loading) {
          $emit('close');
        }
      }
    "
    class="fixed start-0 top-0 z-[1010] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.5)] p-5 lg:p-0"
  >
    <div
      @click.stop
      class="w-full rounded-2xl border border-inputBg-light bg-white p-5 dark:border-inputBg-dark dark:bg-[#141414] lg:w-[550px] lg:p-7"
    >
      <h5 class="mb-3.5 font-bold text-[#232323] dark:text-white xl:text-xl">
        {{ title }}
      </h5>

      <p class="mb-9 text-text-dark dark:text-text-light">{{ text }}</p>

      <div class="flex items-center gap-5">
        <GlobalsButton
          type="button"
          class="h-[53px] flex-1 !rounded-[36px] border border-error font-semibold text-error duration-300 [&:not(:disabled)]:hover:bg-error [&:not(:disabled)]:hover:text-white"
          :text="$t('BUTTONS.cancel')"
          :disabled="loading"
          @handleClick="emits('close')"
        />

        <GlobalsButton
          type="button"
          class="h-[53px] flex-1 !rounded-[36px] border border-transparent bg-[#CE11271A] font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
          :text="btnText"
          :disabled="loading"
          @handleClick="emits('handleClick')"
        />
      </div>
    </div>
  </div>
</template>
