<template>
  <div>
    <div
      class="mb-6 rounded-2xl bg-white card-shadow px-6 py-4 dark:bg-box-container-dark"
    >
      <h3 class="mb-2 text-primary text-2xl font-bold leading-9">
        {{ $t("TITLES.products_services") }}
      </h3>

      <p class="text-gray-500 dark:text-gray-300">
        {{ $t("TITLES.our_recent_services") }}
      </p>
    </div>

    <div class="bg-white dark:bg-box-container-dark card-shadow rounded-2xl p-5 grid grid-cols-12 gap-8">
      <div class="order-2 col-span-12 xl:order-1 xl:col-span-12">
        <div class="mb-7 last:mb-0">
          <button type="button" class="mb-4 flex items-center gap-2">
            <img src="/profile/icons/pinned.svg" class="dark:invert" />
            <span class="text-xl font-semibold capitalize">{{
              $t("TITLES.pinned")
            }}</span>
          </button>

          <div
            class="flex flex-wrap w-full gap-3"
          >
            <div
              v-for="card in items.flatMap((category) =>
                category.cards.filter((card) => card.pinned),
              )"
              :key="card.id"
            >
              <ProfileProductsServicesCard
                :card="card"
                class="pinned"
                @makePinUnPin="makePinUnPin"
              />
            </div>
          </div>
        </div>

        <div v-for="(item, i) in items" :key="i" class="mb-8 last:mb-0">
          <button
            :id="item.id"
            type="button"
            class="mb-4 flex items-center gap-2"
          >
            <img
              src="/profile/icons/pinned.svg"
              class="dark:invert"
              v-if="item.category == 'pinned'"
            />
            <span class="text-xl font-semibold capitalize">{{
              item.category
            }}</span>
          </button>

          <div
            class="flex flex-wrap w-full gap-3"
          >
            <div v-for="card in item.cards" :key="card.id">
              <ProfileProductsServicesCard
                :card="card"
                @makePinUnPin="makePinUnPin"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="hidden order-1 col-span-12 xl:order-2 xl:col-span-3">
        <div
          class="sticky top-[15px] flex w-full items-center gap-3 overflow-x-auto pb-2.5 xl:block xl:h-[70vh] xl:overflow-y-auto xl:pb-0"
        >
          <!-- <div
            v-for="cat in items"
            :key="cat"
            class="min-w-[300px] xl:mb-4 xl:min-w-full xl:last:mb-0"
          >
            <NuxtLink
              :to="localePath(`/profile/#${cat.id}`)"
              :class="
                $route.fullPath.includes(cat.id) ? 'bg-primary text-white' : ''
              "
              class="flex w-full items-center justify-center rounded-lg border border-primary py-2 text-center text-xs transition-all xl:text-sm"
            >
              {{ cat.category }}
            </NuxtLink>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const localePath = useLocalePath();

const { t, locale } = useI18n();

useHead({
  title: t("TITLES.products_services"),
  meta: [
    {
      name: "description",
      content: t("TITLES.our_recent_services"),
    },
  ],
});

/* Start of the function that fetch data */
const items = ref([
  {
    id: 84315,
    category: locale.value === "ar" ? "منصة مصر الرقمية" : "Egypt MLS",
    cards: [
      {
        id: "6443455",
        image: "/profile/crm-matrix.svg",
        title: locale.value === "ar" ? "إدارة العملاء" : "CRM",
        description:
          locale.value === "ar"
            ? "إدارة علاقات العملاء"
            : "Customer Relationship Management",
        to: "https://egypt.mlsmatrix.com/matrix/login.aspx",
        pinned: false,
      },
      {
        id: "64434551",
        image: "/profile/merket-reports.svg",
        title: locale.value === "ar" ? "تقارير السوق" : "Market Reports",
        description: locale.value === "ar" ? "اتجاهات السوق" : "Market Trends",
        to: "https://egypt.mlsmatrix.com/Matrix/MarketReports",
        pinned: false,
      },
      {
        id: "64434552",
        image: "/profile/add-edit.svg",
        title: locale.value === "ar" ? "إضافة / تعديل" : "Add / Edit",
        description: locale.value === "ar" ? "مدير القائمة" : "Listing Manager",
        to: "https://egypt.mlsmatrix.com/Matrix/AddEdit",
        pinned: false,
      },
    ],
  },
  {
    id: 8415,
    category:
      locale.value === "ar"
        ? "منصات التواصل الإجتماعي"
        : "Egypt MLS Social Media",
    cards: [
      {
        id: "634",
        image: "/profile/facebook.svg",
        title: locale.value === "ar" ? "فيسبوك" : "Facebook",
        description: "Egypt MLS",
        to: "https://www.facebook.com/EVCFL?mibextid=LQQJ4d",
        pinned: false,
      },
      {
        id: "2347",
        image: "/profile/instagram.svg",
        title: locale.value === "ar" ? "إنستجرام" : "Instagram",
        description: "@egypt.mls",
        to: "https://www.instagram.com/egypt.mls?igsh=MWFrNnFwMmx1a2R3eQ%3D%3D&utm_source=qr",
        pinned: false,
      },
      {
        id: "23448",
        image: "/profile/twitter.svg",
        title: locale.value === "ar" ? "تويتر" : "Twitter",
        description: "@egyptmls",
        to: "https://x.com/egyptmls?s=21&t=aWFY1KXraGkeYPe2zpuLUA",
        pinned: false,
      },
      {
        id: "23441",
        image: "/profile/linkedin.svg",
        title: locale.value === "ar" ? "لينكدإن" : "Linked in",
        description: "Egypt MLS",
        to: "https://www.linkedin.com/company/egypt-mls/",
        pinned: false,
      },
    ],
  },
  {
    id: 8415,
    category:
      locale.value === "ar"
        ? "منتجاتنا"
        : "Egypt MLS Products",
    cards: [
      {
        id: "634",
        image: "https://arabmls.org/wp-content/uploads/2023/11/1618f50b3a6df61a6e7eacbadcd014a7.png",
        title: "Arab MLS",
        description: "arabmls.org",
        to: "https://arabmls.org/",
        pinned: false,
      },
      {
        id: "2347",
        image: "/logo/egypt-platform-logo-light.svg",
        title: locale.value === "ar" ? "منصة مصر العقارية" : "Egyptian Real Estate Platform",
        description: "realestate.gov.eg",
        to: "/logo/egypt-platform-logo-light.svg",
        pinned: false,
      },
      {
        id: "23448",
        image: "/icons/agent-fallback.png",
        title: locale.value === "ar" ? "ابحث عن وكيل" : "Find An Agent",
        description: "",
        to: "https://realestate.gov.eg/Agents",
        pinned: false,
      },
      // {
      //   id: "23441",
      //   image: "/profile/linkedin.svg",
      //   title: locale.value === "ar" ? "لينكدإن" : "Linked in",
      //   description: "Egypt MLS",
      //   to: "https://www.linkedin.com/company/egypt-mls/",
      //   pinned: false,
      // },
    ],
  },
]);

const makePinUnPin = (id) => {
  items.value.map((cat) => {
    cat.cards.map((card) => {
      if (card.id == id) {
        card.pinned = !card.pinned;
      }
    });
  });

  useCookie("mls_pinned_arr").value = items.value
    .flatMap((category) => category.cards.filter((card) => card.pinned))
    .map((el) => el.id);
};

const resultPinnedArr = ref([]);

watch(
  () => useCookie("mls_pinned_arr").value,
  (arr) => {
    resultPinnedArr.value = arr;
  },
  {
    immediate: true,
    deep: true,
  },
);

const axios = useNuxtApp().$axios;

await useAsyncData("products-and-services", () =>
  axios.post("/product/getByFilter", {
    filters: "",
    page: 1,
    page_size: 999,
    related_objects: ["productImage"],
    related_objects_count: [],
  }),
).then((res) => {
  let result = res.data.value.data.data.product.data;

  result.forEach((el) => {
    let obj = {
      id: el.id,
      image: el.product_image,
      title: el.display_name,
      description: el.description,
      to: el.url,
      pinned: false,
    };

    if (el.product_name === "MATRIX") {
      axios
        .get("/product/getRedirectUrl", {
          params: {
            product_id: result[0].id,
          },
        })
        .then((res) => {
          obj.to = res.data.data.redirect_url;

          const categoryTitle =
            locale.value === "ar" ? "منصة مصر الرقمية" : "Egypt MLS";

          items.value = items.value.map((item) => {
            if (item.category === categoryTitle) {
              item.cards = item.cards.map((card) => {
                return {
                  ...card,
                  to: `${card.to}${res.data.data.redirect_url.slice(
                    res.data.data.redirect_url.indexOf("?"),
                  )}`,
                };
              });
            }

            return item;
          });

          items.value
            .find(
              (cat) =>
                cat.category == "Egypt MLS" ||
                cat.category === "منصة مصر الرقمية",
            )
            ?.cards?.unshift(obj);

          if (
            useCookie("mls_pinned_arr").value &&
            useCookie("mls_pinned_arr").value?.length > 0
          ) {
            items.value.map((item) => {
              item.cards.map((card) => {
                useCookie("mls_pinned_arr").value.includes(card.id) &&
                  (card.pinned = true);
              });
            });
          }
        })
        .catch((e) => console.error(e));
    }
  });
});
/* End of the function that fetch data */

const temporaryToken = useCookie("mls_egypt_temporary_token");

onMounted(() => {
  temporaryToken.value = null;
});
</script>
