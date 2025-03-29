
<script setup lang="ts">
// import { Button } from 'primevue'
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
import StatCard from './StatCard.vue'
import InsightsCard from '~/components/Cards/InsightsCard.vue';
const insightCards = ref([
  {
    insightTitle : t('INSIGHTS.newLeads'),
    insightValue : 0,
    insightIcon : 'People'
  },
  {
    insightTitle : t('INSIGHTS.buyerMatches'),
    insightValue : 0,
    insightIcon : 'Briefcase'
  },
  {
    insightTitle : t('INSIGHTS.propertySold'),
    insightValue : 0,
    insightIcon : 'BrifecaseTick'
  },
  {
    insightTitle : t('INSIGHTS.propertyRent'),
    insightValue : 0,
    insightIcon : 'Building'
  },
])

</script>
<template>
    <div class="px-4 py-4 mt-3 w-full border-t border-zinc-100 max-md:max-w-full">
      <div class="flex gap-3 flex-wrap justify-center items-center rounded-2xl">
          <InsightsCard v-for="(card, index) in insightCards" class="my-2" :index="index" :insight="card"></InsightsCard>
      </div>
    </div>
  </template>