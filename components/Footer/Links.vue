<script setup>
defineProps({
  links: {
    type: Object,
    required: true,
    default: null,
  },
});

const localePath = useLocalePath();
</script>

<template>
  <div class="font-medium">
    <h5 class="mb-5 text-lg text-[#999999]">{{ $t('TITLES.fastLinks') }}</h5>

    <ul>
      <li
        v-for="(item, i) in links"
        :key="i"
        class="mb-3 text-sm duration-300 last-of-type:mb-0 hover:lg:scale-105"
      >
        <NuxtLink :to="localePath(item.path)">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
