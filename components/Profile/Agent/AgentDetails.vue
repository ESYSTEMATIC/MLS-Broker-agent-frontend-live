<script setup lang="ts">
import GoogleMaps from '../BuyLeads/GoogleMaps.vue';
import AgentInfo from './AgentInfo.vue'
import AgentStats from './AgentStats.vue'
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore()
const isShowModal = ref(false)
const isMapStepVisible = ref(true)
const currentLocationIndex = ref(0)
// Default locations (Cairo as a fallback)
const defaultLocations = ref([
  { lat: 30.04449099, lng: 31.24083294 , name: "Cairo, Egypt" , percentage : 10 }, // Cairo
  { lat: 29.9772962, lng: 31.1324955 , name: "Great Pyramid of Giza" , percentage : 10 }, // Pyramids
  { lat: 31.2001, lng: 29.9187, name: "Alexandria, Egypt" , percentage : 10 }, // Alexandria
]);

const incrementLocation = () => {
  if(currentLocationIndex.value == defaultLocations.value.length - 1){
    return
  }
  currentLocationIndex.value ++
}
const decrementLocation = () => {
  if(currentLocationIndex.value == 0){
    isMapStepVisible.value = true;
    return
  }
  currentLocationIndex.value --
}
</script>
<template>
    <div v-if="authStore.profileData" class="ml-5 w-[67%] max-md:ml-0 max-md:w-full">
      <div class="flex overflow-hidden flex-col grow px-3 w-full bg-white dark:bg-box-container-dark rounded-xl card-shadow min-h-[620px] max-md:mt-6 max-md:max-w-full">
        <div class="flex items-center justify-between w-full border-b px-3 py-5 max-md:pr-5 max-md:max-w-full">
          <h2 class="font-semibold text-xl text-black dark:text-white">Agent Details</h2>
          <button @click="isShowModal = true;" class="py-3 min-w-[140px] rounded-full bg-[#CE11270D] font-medium text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary">Buy Leads</button>
        </div>
        <AgentInfo />
        <AgentStats />
      </div>
    </div>

    <Teleport to="body">
      <transition name="translateXIn">
        <GlobalsModal class="modal" v-if="isShowModal" title="Buy Leads" text="Buy Leads"
        width="lg:w-[1000px] md:w-[800px] sm:w-[500px] w-full"
        special @close="isShowModal = false;" >
          <div v-if="isMapStepVisible">
            <GoogleMaps v-model="defaultLocations"></GoogleMaps>
            <button :disabled="!defaultLocations.length" @click="isMapStepVisible = false;" class="py-3 w-full rounded-full bg-[#CE11270D] font-medium text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary">Next</button>
          </div>
          <div v-else>
            <div>
              <li class="flex gap-4 p-5 border rounded my-4">
                <span>📍 {{ currentLocationIndex + 1 }}:</span>
                <span>{{ defaultLocations[currentLocationIndex].name }}</span>
                <!-- <span>Lat: {{ marker.lat.toFixed(6) }}, Lng: {{ marker.lng.toFixed(6) }}</span> -->
              </li>
              <p class="text-center text-xl my-5">Enter a percentage</p>
              <div class="w-full flex justify-center items-center my-6">
                <input type="number" value="10" max="100" min="1" class="text-3xl font-semibold text-center w-[60px] text-[#CC0001] mx-2">
                <span class="text-3xl text-[#CC0001] font-medium">%</span>
              </div>
            </div>
            <div class="flex gap-5 items-center">
              <button @click="decrementLocation" class="py-3 w-full rounded-full border border-[#120202] font-medium text-[#120202] transition-all hover:bg-[#120202] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary">Previous</button>
              <button @click="incrementLocation" class="py-3 w-full rounded-full bg-[#CE11270D] font-medium text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary">Next</button>
            </div>
          </div>
        </GlobalsModal>
      </transition>
    </Teleport>
</template>


<style scoped>
[dir="ltr"] {
  .translateXIn-enter-active,
  .translateXIn-leave-active {
    transition: all 0.2s ease-in-out;
  }
  .translateXIn-enter-from,
  .translateXIn-leave-to {
    transform: translateY(100%);
  }
}

[dir="rtl"] {
  .translateXIn-enter-active,
  .translateXIn-leave-active {
    transition: all 0.2s ease;
  }
  .translateXIn-enter-from,
  .translateXIn-leave-to {
    transform: translateY(-100%);
  }
}
</style>