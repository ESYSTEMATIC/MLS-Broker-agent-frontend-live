<template>
  <div class="flex flex-wrap items-center justify-between">
    <div class="flex flex-grow flex-wrap items-center gap-4 md:flex-nowrap">
      <div v-for="item in items" :key="item.key" class="w-full">
        <FilterBaseInputFilter
          v-if="item.type == 'search'"
          icon="search"
          :name="item.name"
          :placeholder="item.placeholder"
          :value="$route.query[item.key]"
          @change="filterData(item.key, $event.target.value)"
        />

        <FilterBaseDateInput
          v-if="item.type == 'date'"
          :placeholder="item.placeholder"
          :value="$route.query[item.key] && new Date($route.query[item.key])"
          @change="filterData(item.key, $event)"
        />
      </div>
    </div>

    <div
      class="hidden min-w-[80px] items-center justify-end gap-4 md:flex lg:min-w-[350px]"
    >
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});

const filterData = (key, value) => {
  let query = {};

  if (!key.includes("date")) {
    query[key] = value ? value : null;
  } else {
    query[key] = value ? new Date(value).toLocaleDateString() : null;
  }

  router.push({
    query: Object.assign({}, route.query, query),
  });
};
</script>
