<template>
  <div class="flex flex-col my-7 w-full max-md:max-w-full">
    <!-- <Chat :receiverId="'kimo'"></Chat> -->
    <section class="max-md:mr-1 max-md:max-w-full">
        <div class="flex gap-5 max-md:flex-col">
        <ProfileAgentProfileCard />
        <AgentDetails />  
        </div>
    </section>

    <ProfileAgentServiceArea />
    <ProfileAgentCertificates />
    
    <!-- <section>
        <h2 class="self-start mt-14 text-lg font-semibold text-black max-md:mt-10">Active Leads Listing</h2>
        <div class="flex flex-wrap gap-8 items-center mt-6 max-md:mr-1 max-md:max-w-full">
        <ProfileAgentPropertyCard v-for="i in 3" :key="i" />
        </div>
    </section> -->
    </div>
</template>

<script setup>
import Chat from '~/components/Globals/Chat.vue';
import AgentDetails from '~/components/Profile/Agent/AgentDetails.vue';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: "profile",
});

const authStore = useAuthStore()
const localePath = useLocalePath();

const { t, locale } = useI18n();
console.log(authStore.profileData);

useHead({
  title: t("TITLES.products_services"),
  meta: [
    {
      name: "description",
      content: t("TITLES.our_recent_services"),
    },
  ],
});

const axios = useNuxtApp().$axios;

const temporaryToken = useCookie("mls_egypt_temporary_token");

onMounted(() => {
  temporaryToken.value = null;
});
</script>
