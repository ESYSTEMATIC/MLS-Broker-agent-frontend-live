<template>
    <Teleport to="body">
    </Teleport>
  
    <div class="t-table">
      <div class="t-head">
  
        <div class="cell w-[25%]">
          {{ $t("LABELS.user_name") }}
        </div>
        <div class="cell w-[25%]">
          {{ $t("LABELS.user_image") }}
        </div>
  
        <div class="cell w-[25%]">
          {{ $t("LABELS.message") }}
        </div>
  
        <div class="cell w-[25%]">
          {{ $t("LABELS.status") }}
        </div>
  
        <div class="cell w-[25%]">
          {{ $t("LABELS.created_at") }}
        </div>
  
        <!-- <div class="cell w-[15%]">
          {{ $t("LABELS.comment") }}
        </div> -->
        <div class="cell w-[15%]">
          {{ $t("LABELS.stars") }}
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
          <div class="cell w-[20%]">
            {{ item.user_name }}
          </div>
          <div class="cell flex w-[10%]">
            <img :src="item.user_image" class=" w-[100px] rounded h-[80px] object-cover" alt="">
          </div>
  
          <div class="cell w-[25%]">
            <span v-if="item.message">
              {{ item.message }}
            </span>
  
            <span v-else>
              {{ $t("TEXTS.notFound") }}
            </span>
          </div>
  
          <div class="cell w-[5%]">
            <span v-if="item.is_rate">
              {{ $t("BUTTONS.rated") }}
            </span>
            
            <span v-else>
              {{ $t("BUTTONS.pending") }}
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
  
          <div class="cell w-[5%]">
            {{ item.rate }}
          </div>
  

        </div>
  
        <p
          v-else
          class="mt-2 w-full text-center text-text-light dark:text-text-dark"
        >
          {{ $t("TEXTS.noReviews") }}
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
  