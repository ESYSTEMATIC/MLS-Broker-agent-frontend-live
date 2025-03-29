<template>
    <div>
      <div
        class="mb-6 rounded-2xl bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
      >
        <h3 class="mb-2 text-primary text-2xl font-bold leading-9">
          {{ $t("TITLES.reports") }}
        </h3>
  
        <p class="">
          {{ $t("TITLES.your_recent_reports") }}
        </p>
      </div>
  
      <div class="rounded-2xl light:bg-white card-shadow px-6 py-4">
        <h1>Leads Over Time </h1>
        <apexchart
          type="area"
          height="350"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "profile",
  });
  
  const { t, locale, locales } = useI18n();
  
  useHead({
    title: t("TITLES.reports"),
    meta: [
      {
        name: "description",
        content: t("TITLES.your_recent_reports"),
      },
    ],
  });
  
  const route = useRoute();

  /* Start of the function that fetch data */
  const token = localStorage.getItem("mls_egypt_token");
  
  const headers = {
    "Accept-Language": locales.value.find((item) => item.code === locale.value)
      ?.iso,
    Lang: locale.value,
    Authorization: `Bearer ${token.value}`,
  };
  
  const {
    public: { baseURL },
  } = useRuntimeConfig();

const series = ref([{ name: "Leads", data: [30, 40, 45, 50, 49 , 20 , 15 , 19 , 24 , 33 , 10, 22] }]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "area",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  xaxis: {
    tickAmount: 15,
    tickPlacement: "between",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value?.toLocaleString();
      },
    },
    min: 0,
    max: 50,
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  fill: {
    opacity: 0,
    type: "gradient",
    gradient: {
      shade: "light",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 0,
      opacityTo: 0.3,
      stops: [0, 50, 53, 91],
    },
  },
  grid: {
    show: true,
    borderColor: "#F2F3F3",
    strokeDashArray: 5,
  },
  colors: ["#FAE7E9", "#12B76A", "#333333", "#CE1127"],
  legend: {
    horizontalAlign: "right",
    fontFamily: "Neo Sans",
    fontWeight: 300,
    fontSize: "15px",
    inverseOrder: true,
    itemMargin: {
      horizontal: 15,
      vertical: 10,
    },
    markers: {
      width: 9,
      height: 9,
      offsetY: 1,
    },
  },
}); 

</script>
  
  <style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  