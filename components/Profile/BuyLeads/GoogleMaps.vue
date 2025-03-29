<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

// Google Maps API Key
const API_KEY = "AIzaSyCefhMdOJ9iBPb_o9w-2N6BVWwxy1R6MuU"; // Replace with your API key

// Props
const props = defineProps({
  modelValue: Array as () => { lat: number; lng: number; name?: string; }[], // Array of locations
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Default locations (Cairo as a fallback)
const defaultLocations = ref([
  { lat: 30.04449099, lng: 31.24083294 , name: "Cairo, Egypt" }, // Cairo
  { lat: 29.9772962, lng: 31.1324955 , name: "Great Pyramid of Giza" }, // Pyramids
  { lat: 31.2001, lng: 29.9187, name: "Alexandria, Egypt" }, // Alexandria
]);

// Reactive array of locations
const locations = ref<{ lat: number; lng: number; name? : string }[]>(props.modelValue?.length ? [...props.modelValue] : [...defaultLocations.value]);

// Watch for external changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && newVal.length) {
      locations.value = [...newVal];
    }
  },
  { deep: true }
);

const getLocationName = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.length ? data.results[0].formatted_address : "Unknown Location";
  } catch (error) {
    console.error("Error fetching location name:", error);
    return "Unknown Location";
  }
};

const addMarker = async (e: any) => {
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();
  const name = await getLocationName(lat, lng);
  const newMarker = { lat, lng, name };
  
  locations.value.push(newMarker);
  emit("update:modelValue", locations.value);
};

// Handle Marker Drag (Update Marker Position and Name)
const updateMarker = async (index: number, e: any) => {
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();
  const name = await getLocationName(lat, lng);

  locations.value[index] = { lat, lng, name };
  emit("update:modelValue", locations.value);
};

// Reset Markers to Default Locations
const resetMarkers = () => {
  locations.value = [...defaultLocations.value];
  emit("update:modelValue", locations.value);
};
</script>

<template>
  <div class="w-full card-shadow p-5 rounded-2xl max-h-[500px] overflow-y-auto my-5">
    <h1 class="py-3 border-b">Maps</h1>
    <GoogleMap
      :api-key="API_KEY"
      :center="locations[0]"
      :zoom="10"
      style="width: 100%; height: 400px"
      @click="addMarker"
    >
      <!-- Loop through markers -->
      <Marker
        v-for="(marker, index) in locations"
        :key="index"
        :options="{ position: marker, draggable: true }"
        @dragend="updateMarker(index, $event)"
      />
    </GoogleMap>

    <!-- Latitude & Longitude List -->
    <div class="p-5">
      <h3 class="font-bold">Selected Districts</h3>
      <ul>
        <li v-for="(marker, index) in locations" :key="index" class="flex gap-4 p-2 border-b">
          <span>📍 {{ index + 1 }}:</span>
          <span>{{ marker.name }}</span>
          <!-- <span>Lat: {{ marker.lat.toFixed(6) }}, Lng: {{ marker.lng.toFixed(6) }}</span> -->
        </li>
      </ul>
    </div>

    <!-- Reset Button -->
    <button @click="resetMarkers" class="bg-red-500 text-white px-4 py-2 rounded-md mt-3">
      Reset Markers
    </button>
  </div>
</template>

<style scoped>
.map-container {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
}
.location-info {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}
button {
  cursor: pointer;
}
</style>
