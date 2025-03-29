<script setup lang="ts">
const props = defineProps<{
    insight: {
        insightTitle : string
        insightValue : number
        insightIcon : string
    }
    index: number
}>()
</script>


<template>
    <div class="insight-card dark:bg-box-container-dark card-shadow">
        <div>
            <h4 class="font-light">{{ insight.insightTitle }}</h4>
            <h1 class="font-semibold mt-1">{{ insight.insightValue }}</h1>
        </div>
        <div class="insight-card-icon">
            <VsxIcon :iconName="insight.insightIcon" :size="28" color="#E5393A" type="linear" />
        </div>
    </div>
</template>

<style>
.insight-card {
    display: flex;
    flex-grow: 1;
    background-color: white;
    width: 270px;
    justify-content: space-between;
    align-items: center;
    border-radius: 24px;
    padding: 30px 20px;
}

.insight-card-icon{
    padding: 8px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.40);
    /* Drop shadow 1 */
    box-shadow: 0px 2px 10px 0px rgba(124, 141, 181, 0.12);
}
</style>