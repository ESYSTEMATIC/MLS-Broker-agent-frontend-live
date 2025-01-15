<script setup>
const i18n = useI18n();

const data = ref([
  {
    stat: 2,
    value: 0,
    title: i18n.t("TITLES.endUsers"),
  },
  {
    stat: 28,
    value: 0,
    title: i18n.t("TITLES.loginsMonth"),
  },
  {
    stat: 50,
    value: 0,
    title: i18n.t("TITLES.yearsRealState"),
  },
  {
    stat: 200,
    value: 0,
    title: i18n.t("TITLES.analysisModels"),
  },
]);

const counted = ref(false);

function handleScroll() {
  const element = document.getElementById("portfolio");

  if (
    element &&
    window.scrollY + window.innerHeight >= element.offsetTop + 700
  ) {
    if (!counted.value) {
      data.value.forEach((item, index) => {
        const interval = setInterval(() => {
          if (item.value >= item.stat) {
            clearInterval(interval);
          } else {
            item.value++;
          }
        }, 50);

        data.value[index] = item;
      });

      counted.value = true;
    }
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  handleScroll();
});
</script>

<template>
  <section class="container overflow-hidden py-5">
    <div class="grid grid-cols-12 gap-5">
      <div v-for="(stat, i) in data" :key="i" class="col-span-12 lg:col-span-3">
        <CardsStatCard :data="stat" :index="i" />
      </div>
    </div>
  </section>
</template>
