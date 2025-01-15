<script setup></script>

<template>
  <div class="relative flex h-screen items-center justify-center">
    <ClientOnly>
      <img
        v-if="$colorMode.value === 'light'"
        class="pointer-events-none absolute start-0 top-0 size-full select-none object-cover"
        src="/auth/bg.svg"
        alg="auth-bg"
        :draggable="false"
      />

      <img
        v-else
        src="/auth/dark-bg.svg"
        class="pointer-events-none absolute start-0 top-0 size-full select-none object-cover"
        alg="auth-bg"
        :draggable="false"
      />
    </ClientOnly>

    <div class="container flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>
