<template>
    <Teleport to="body">
      <GlobalsModal
        class="modal"
        v-if="isShowModal"
        width="lg:w-[800px] md:w-[800px] sm:w-[500px] w-full"
        special
        @close="
          isShowModal = null;
          card.value = null;
        "
      >
        <div class="mb-4 flex gap-4 md:mb-6">
          <div>
            <img
              v-show="$colorMode.value === 'light'"
              src="/public/profile/invoice_sm_light.svg"
              alt="logo-lms"
              class="w-12"
              draggable="false"
            />
  
            <img
              v-show="$colorMode.value === 'dark'"
              src="/public/profile/invoice_sm_dark.svg"
              alt="logo-lms"
              class="w-12"
              draggable="false"
            />
          </div>
  
          <div>
            <h3 class="mb-2 text-lg font-semibold">
              {{ $t("TITLES.DUBAI_MLS") }}
            </h3>
  
            <div class="flex gap-6">
              <div
                class="text-[10px] font-medium text-gray-500 dark:text-gray-200"
              >
                <p>https://www.egymls.com/</p>
  
                <p>info@arabmls.org</p>
  
                <p v-if="$i18n.locale === 'ar'" dir="ltr" class="text-end">
                  +20 122 5444440
                </p>
                <p v-else>+20 122 5444440</p>
              </div>
  
              <div
                class="max-w-[145px] text-[10px] font-medium text-gray-500 dark:text-gray-200"
              >
                <p>City Stars, Stars Capital A2, Cairo, Egypt</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="mb-3.5 p-4 md:mb-8 xl:mb-6">
          <div class="mb-16 grid grid-cols-3 gap-4 md:gap-0">
            <div>
              <div class="mb-4">
                <p class="mb-2 text-xs text-gray-600 dark:text-gray-100">
                  {{ $t("LABELS.invoice_name") }}
                </p>
  
                <p class="text-xs font-medium md:text-sm">
                  <span v-if="card.purchase_type === 'subscriptionPayment'">
                    {{ $t("TITLES.membershipPackage") }}
                  </span>
  
                  <span
                    v-else-if="
                      card.purchase_type === 'developer' ||
                      card.purchase_type === 'broker'
                    "
                  >
                    {{ $t("TITLES.application") }}
                  </span>
  
                  <span v-else-if="card.purchase_type === 'token'">
                    {{ $i18n.locale === "ar" ? "رمز" : "Token" }}
                  </span>
  
                  <span v-else>
                    {{ $t("TEXTS.notFound") }}
                  </span>
                </p>
              </div>
            </div>
  
            <div>
              <div class="mb-4">
                <p class="mb-2 text-xs text-gray-600 dark:text-gray-100">
                  {{ $t("TITLES.invoice_number") }}
                </p>
  
                <p class="text-xs font-medium md:text-sm">#{{ card.id }}</p>
              </div>
            </div>
  
            <div>
              <div>
                <p class="mb-2 text-xs text-gray-600 dark:text-gray-100">
                  {{ $t("LABELS.invoice_date") }}
                </p>
  
                <p class="text-xs font-medium md:text-sm">
                  {{
                    new Date(card.created_at)
                      .toLocaleDateString()
                      .toString()
                      .replaceAll("/", "-")
                  }}
                </p>
              </div>
            </div>
  
            <div>
              <div v-if="card.due_date">
                <p class="mb-2 text-xs text-gray-600 dark:text-gray-100">
                  {{ $t("LABELS.paymentDate") }}
                </p>
  
                <p class="text-xs font-medium md:text-sm">
                  {{
                    new Date(card.payment_date)
                      .toLocaleDateString()
                      .toString()
                      .replaceAll("/", "-")
                  }}
                </p>
              </div>
            </div>
          </div>
  
          <div class="mb-4 overflow-auto">
            <table class="w-[500px] overflow-x-auto md:w-full">
              <thead>
                <tr>
                  <th>{{ $t("TITLES.service") }}</th>
  
                  <th>{{ $t("LABELS.paymentDate") }}</th>
  
                  <th>{{ $t("TITLES.qty") }}</th>
  
                  <th>{{ $t("TITLES.unitPrice") }}</th>
  
                  <th>{{ $t("TITLES.amount") }}</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td class="!font-semibold">
                    <span v-if="card.purchase_type === 'subscriptionPayment'">
                      {{ $t("TITLES.membershipPackage") }}
                    </span>
  
                    <span
                      v-else-if="
                        card.purchase_type === 'developer' ||
                        card.purchase_type === 'broker'
                      "
                    >
                      {{ $t("TITLES.application") }}
                    </span>
  
                    <span v-else-if="card.purchase_type === 'token'">
                      {{ $i18n.locale === "ar" ? "رمز" : "Token" }}
                    </span>
  
                    <span v-else>
                      {{ $t("TEXTS.notFound") }}
                    </span>
                  </td>
  
                  <td>
                    {{
                      new Date(card.created_at)
                        .toLocaleDateString()
                        .toString()
                        .replaceAll("/", "-")
                    }}
                  </td>
  
                  <td>{{ card.quantity }}</td>
  
                  <td>
                    {{ (+card.total_price).toLocaleString() }}
                    {{ $t("TITLES.AED") }}
                  </td>
  
                  <td>
                    {{ (+card.unit_price * +card.quantity).toLocaleString() }}
                    {{ $t("TITLES.AED") }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div
            class="mb-4 border-b border-gray-200 pb-4 text-xs dark:border-boxDB-dark md:text-sm"
          >
            <div class="mb-3 flex items-center justify-between font-medium">
              <p>{{ $t("TITLES.subtotal") }}</p>
  
              <p>
                {{ (+card.unit_price * +card.quantity).toLocaleString() }}
                {{ $t("TITLES.AED") }}
              </p>
            </div>
  
            <!-- <div class="flex items-center justify-between font-medium">
              <p>{{ $t("TITLES.tax") }} (14%)</p>
  
              <p>
                {{ $t("TITLES.AED") }}
                {{ (+card.unit_price * +card.quantity * 0.14).toLocaleString() }}
              </p>
            </div> -->
          </div>
  
          <div class="flex items-center justify-between font-bold">
            <p>{{ $t("TITLES.total") }}</p>
  
            <p>
              <!-- {{
                +card.unit_price * +card.quantity +
                +card.unit_price * +card.quantity * 0.14
              }} -->
              {{
                +card.unit_price * +card.quantity 
              }}
              {{ $t("TITLES.AED") }}
            </p>
          </div>
        </div>
  
        <p class="ps-5 font-semibold">
          {{ $t("TITLES.thanks_for_the_business") }}
        </p>
      </GlobalsModal>
    </Teleport>
  
    <div class="t-table">
      <div class="t-head">
        <div class="cell w-[5%]">ID</div>
  
        <div class="cell w-[25%]">
          {{ $t("LABELS.image") }}
        </div>
  
        <div class="cell w-[25%]">
          {{ $t("LABELS.name") }}
        </div>
  
        <div class="cell w-[25%]">
          {{ $t("LABELS.phone") }}
        </div>
  
        <div class="cell w-[15%]">
          {{ $t("LABELS.email") }}
        </div>
        <div class="cell w-[15%]">
          {{ $t("LABELS.last_message") }}
        </div>
  
        <div class="cell w-[10%]" />
      </div>

      <div>
        <template v-if="loading">
          <div v-for="i in 15" :key="i" class="t-body group gap-3">
            <GlobalsSkeleton class="h-[21px] w-[5%]" />
  
            <GlobalsSkeleton class="h-[21px] w-[20%]" />
  
            <GlobalsSkeleton class="h-[21px] w-[30%]" />
  
            <GlobalsSkeleton class="h-[21px] w-[15%]" />
  
            <GlobalsSkeleton class="h-[21px] w-[15%]" />
  
            <GlobalsSkeleton class="h-[21px] w-[10%]" />
  
            <GlobalsSkeleton class="h-[21px] w-[5%]" />
          </div>
        </template>
  
        <div
          v-else-if="items.length"
          class="t-body group"
          v-for="(item, idx) in items"
          :key="item"
        >
          <div class="cell w-[5%]">
            {{ item.id }}
          </div>
  
          <div class="cell w-[25%]">
            <span v-if="item.purchase_type === 'subscriptionPayment'">
              {{ $t("TITLES.membershipPackage") }}
            </span>
  
            <span
              v-else-if="
                item.purchase_type === 'developer' ||
                item.purchase_type === 'broker'
              "
            >
              {{ $t("TITLES.application") }}
            </span>
  
            <span v-else-if="item.purchase_type === 'token'">
              {{ $i18n.locale === "ar" ? "رمز" : "Token" }}
            </span>
  
            <span v-else>
              {{ $t("TEXTS.notFound") }}
            </span>
          </div>
  
          <div class="cell w-[25%]">
            {{
              new Date(item.created_at)
                .toLocaleDateString()
                .toString()
                .replaceAll("/", "-")
            }}
          </div>
  
          <div class="cell w-[25%]">
            {{
              new Date(item.payment_date)
                .toLocaleDateString()
                .toString()
                .replaceAll("/", "-")
            }}
          </div>
  
          <div class="cell w-[15%]">
            {{ item.quantity }}
          </div>
  

        </div>
  
        <p
          v-else
          class="mt-2 w-full text-center text-text-light dark:text-text-dark"
        >
          {{ $t("TEXTS.noContacts") }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    items: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
  
  const isShowModal = ref(null);
  const card = ref(null);
  const showModal = (idx) => {
    card.value = props.items[idx - 1];
    isShowModal.value = idx;
  };
  </script>
  
  <style lang="scss" scoped>
  .t-table {
    .t-head {
      @apply mb-5 flex items-center rounded-2xl bg-[#f8f9f9] p-5 dark:bg-[#414141];
      div.cell {
        @apply text-center;
      }
    }
    .t-body {
      @apply mb-5 flex items-center rounded-2xl rounded-b-none border-b border-gray-200 p-5 transition-all hover:shadow-md dark:border-border-dark;
      div.cell {
        @apply text-center text-sm;
      }
    }
  }
  .modal {
    table {
      thead {
        tr {
          @apply border-y border-gray-600 dark:border-border-dark;
          th {
            @apply py-3 text-sm font-medium text-gray-600 dark:text-gray-200;
          }
        }
      }
      tbody {
        @apply border-b border-gray-200 dark:border-boxDB-dark;
        tr {
          @apply text-center;
          td {
            @apply py-4 text-sm font-medium;
          }
        }
      }
    }
  }
  </style>
  