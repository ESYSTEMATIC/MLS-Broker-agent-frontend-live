<template>
  <Teleport to="body">
    <GlobalsModal
      v-if="openInvoiceModal"
      width="lg:w-[800px] md:w-[800px] sm:w-[500px] w-full"
      special
      @close="openInvoiceModal = false"
    >
      <div class="w-full" id="invoiceDetails">
        <div class="mb-4 flex gap-4 md:mb-6">
          <div class="flex h-[100px] items-center justify-center">
            <img
              v-if="$colorMode.value === 'dark'"
              src="/public/logo/egypt-mls-dark.svg"
              class="h-[70px]"
              alt="light-logo"
              :draggable="false"
            />

            <img
              v-else
              src="/public/logo/egypt-mls-light.svg"
              class="h-[70px]"
              alt="light-logo"
              :draggable="false"
            />
          </div>

          <div>
            <h3 class="mb-2 text-lg font-semibold">
              {{ $t("TITLES.egyptPlatform") }}
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
                  <span v-if="card.purchase_type === 'subscription_fees'">
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

                  <th>{{ $t("TITLES.date") }}</th>

                  <th>{{ $t("TITLES.qty") }}</th>

                  <th>{{ $t("TITLES.unitPrice") }}</th>

                  <th>{{ $t("TITLES.amount") }}</th>
                </tr>
              </thead>

              <tbody>
                <tr class="text-">
                  <td class="!font-semibold">
                    <span v-if="card.purchase_type === 'subscription_fees'">
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

                  <td v-if="card.name == $t('TITLES.tokens')">
                    {{ card.unit_price.toLocaleString() }}
                    {{ $t("TITLES.AED") }}
                  </td>

                  <td v-else>
                    {{ (+card.unit_price).toLocaleString() }}
                    {{ $t("TITLES.AED") }}
                  </td>

                  <td>
                    {{ (+card.total_price).toLocaleString() }}
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
          </div>

          <div class="flex items-center justify-between font-bold">
            <p>{{ $t("TITLES.total") }}</p>

            <p>
              {{ +card.unit_price * +card.quantity }}
              {{ $t("TITLES.AED") }}
            </p>
          </div>
        </div>

        <div
          class="flex flex-col items-start justify-between gap-3 lg:flex-row lg:items-center"
        >
          <p class="ps-5 font-semibold">
            {{ $t("TITLES.thanks_for_the_business") }}
          </p>

          <button
            id="downloadBtn"
            type="button"
            class="rounded-full bg-primary px-7 py-3 text-white"
            @click="downloadPDF"
          >
            {{ $t("BUTTONS.downloadPDF") }}
          </button>
        </div>
      </div>
    </GlobalsModal>
  </Teleport>

  <div
    class="card relative z-[10] overflow-hidden rounded-2xl border p-4 transition-all dark:border-none dark:bg-[#2c2c2c]"
  >
    <div
      class="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-border-dark"
    >
      <img src="/profile/icons/invoice.svg" alt="invoice" />

      <div>
        <p
          class="mb-2 flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-200 md:text-sm"
        >
          <span>
            {{ locale == "en" ? "ID" : $t("TITLES.invoice_number") }} #
          </span>
          <GlobalsSkeleton
            v-if="loading"
            class="!inline-block h-[20px] w-[150px]"
          />
          <span v-else>
            {{
              locale == "en" ? card.id : store.englishToArabicNumerals(card.id)
            }}
          </span>
        </p>

        <GlobalsSkeleton v-if="loading" class="h-[21px] w-[150px]" />
        <h4 v-else class="font-semibold">
          <span v-if="card.purchase_type === 'subscription_fees'">
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
        </h4>
      </div>
    </div>

    <div
      class="mb-4 flex flex-wrap items-center justify-between border-b border-gray-200 pb-4 dark:border-border-dark"
    >
      <div>
        <div class="mb-3 flex items-center gap-2">
          <img
            src="/profile/icons/calendar.svg"
            alt="calendar"
            class="dark:brightness-200"
          />

          <div
            class="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-200 md:text-sm"
          >
            <span>{{ $t("LABELS.invoiceDate") }}:</span>

            <span>
              {{
                new Date(card.created_at)
                  .toLocaleDateString()
                  .toString()
                  .replaceAll("/", "-")
              }}
            </span>
          </div>
        </div>

        <div
          v-if="card.payment_date"
          class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-200 md:text-sm"
        >
          <img
            src="/profile/icons/calendar.svg"
            alt="calendar"
            class="dark:brightness-200"
          />

          <div class="flex items-center gap-2 font-medium">
            <span>{{ $t("LABELS.paymentDate") }}:</span>

            <span>
              {{
                new Date(card.created_at)
                  .toLocaleDateString()
                  .toString()
                  .replaceAll("/", "-")
              }}</span
            >
          </div>
        </div>
      </div>

      <p class="flex items-center gap-2 text-base font-bold text-[#008000]">
        <GlobalsSkeleton v-if="loading" class="h-[21px] w-[75px]" />
        <template v-else>
          {{ +card.unit_price * +card.quantity }}

          {{ $t("TITLES.AED") }}
        </template>
      </p>
    </div>

    <GlobalsSkeleton v-if="loading" class="h-[40px] w-full !rounded-xl" />
    <button
      v-else
      @click="openInvoiceModal = true"
      class="mx-auto flex w-fit items-center justify-center gap-2 transition-all"
      @mouseover="showBtnIcon = true"
      @mouseleave="showBtnIcon = false"
    >
      <img src="/profile/icons/red-eye.svg" />
      <span class="font-medium text-primary">{{
        $t("TITLES.view_invoice")
      }}</span>
      <font-awesome-icon
        :icon="`fas fa-arrow-${locale == 'en' ? 'right' : 'left'}`"
        class="text-primary transition-all"
        :class="!showBtnIcon ? 'w-0 translate-x-4' : 'w-[15px] translate-x-0'"
      />
    </button>

    <div v-if="!loading" class="hovered-bg"></div>
  </div>
</template>

<script setup>
import { useStore } from "~/store";
import html2pdf from "html2pdf.js";

const { locale, t } = useI18n();

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const store = useStore();

const showBtnIcon = ref(false);

const openInvoiceModal = ref(false);

const colorMode = useColorMode();

const changed = ref(false);

/* Start of the function that downloadPDF the invoice */
async function downloadPDF() {
  const downloadButton = document.getElementById("downloadBtn");
  downloadButton.style.display = "none";

  if (colorMode.value === "dark") {
    changed.value = true;

    colorMode.value = "light";
  }

  const invoiceDetails = document.getElementById("invoiceDetails");

  const clone = invoiceDetails.cloneNode(true);

  document.body.appendChild(clone);

  let name = "";

  if (props.card.purchase_type === "subscription_fees") {
    name = t("TITLES.membershipPackage");
  } else if (
    props.card.purchase_type === "developer" ||
    props.card.purchase_type === "broker"
  ) {
    name = t("TITLES.application");
  } else if (props.card.purchase_type === "token") {
    name = locale.value === "ar" ? "رمز" : "Token";
  } else {
    name = t("TEXTS.notFound");
  }

  const options = {
    margin: 1,
    filename: name,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  await html2pdf().from(clone).set(options).save();

  document.body.removeChild(clone);

  downloadButton.style.display = "block";

  if (changed.value) {
    colorMode.value = "dark";
  }
}
/* End of the function that downloadPDF the invoice */
</script>

<style lang="scss" scoped>
.card {
  .hovered-bg {
    @apply absolute bottom-0 end-0 -z-10 h-0 w-0 overflow-hidden rounded-none bg-[#f8f8f8] transition-all duration-[1000ms] dark:bg-box-container-dark;
  }
  &:hover {
    .hovered-bg {
      @apply h-[1000px] w-[1000px] rounded-s-full rounded-t-full;
    }
  }
  .btn-card {
    svg {
      @apply transition-[800ms];
    }
    &:hover {
      svg {
        @apply -rotate-45 text-white dark:text-title-light;
      }
    }
  }
}
table {
  thead {
    tr {
      @apply border-y border-gray-600 dark:border-border-dark;
      th {
        @apply py-3 text-xs font-medium text-gray-600 dark:text-gray-200 md:text-sm;
      }
    }
  }
  tbody {
    @apply border-b border-gray-200 dark:border-boxDB-dark;
    tr {
      @apply text-center;
      td {
        @apply py-4 text-xs font-medium md:text-sm;
      }
    }
  }
}
</style>
