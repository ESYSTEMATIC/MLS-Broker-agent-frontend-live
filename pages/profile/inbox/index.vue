<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
// Firebase Imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7TcpnWZO6WL3wM1HiNEMLt4gQ4JpAG4I",
  authDomain: "marketplace-a98b2.firebaseapp.com",
  databaseURL: "https://marketplace-a98b2-default-rtdb.firebaseio.com",
  projectId: "marketplace-a98b2",
  storageBucket: "marketplace-a98b2.firebasestorage.app",
  messagingSenderId: "66949501925",
  appId: "1:66949501925:web:e46b2e63510e3906b2950c",
  measurementId: "G-1HN05D9Q6X"
};
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

definePageMeta({
    layout: "profile",
  });
  
  const { t, locale, locales } = useI18n();
  
  useHead({
    title: t("TITLES.inbox"),
    meta: [
      {
        name: "description",
        content: t("TITLES.your_recent_inboxes"),
      },
    ],
  });
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

// const { data: session } = useSession();
const route = useRoute();
const toast = useToast();
const messages : any = ref([]);
const messageText = ref('');
const currentChatId : any = ref(null);
const currentChat = ref<{id : number,image : string, name : string, last_message : string, phone : string}>();
const loading = ref(true);
const receiverId : any = ref();
const sectionRef = ref(null);
const userId = ref(569);
const chats = ref([
  {
    id : 1,
    image : 'https://cdn.prod.website-files.com/64022de562115a8189fe542a/6425a5b698c539cbabed6a60_Top-Ideas-To-Help-Improve-Your-Customer-Service.jpg',
    name : 'Mariam Mohamed',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
  {
    id : 2,
    image : 'https://verint.imgix.net/wp-content/uploads/customer-calling-home-featured.png?fit=max&auto=format&auto=compress',
    name : 'Alaa Ali',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
  {
    id : 3,
    image : 'https://img.freepik.com/free-photo/medium-shot-bored-people-working_23-2150697629.jpg',
    name : 'Youssef Wael',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
  {
    id : 4,
    image : 'https://img.freepik.com/free-photo/medium-shot-bored-people-working_23-2150697629.jpg',
    name : 'Ahmed Mohamed',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
  {
    id : 5,
    image : 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=',
    name : 'Kareem',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
  {
    id : 6,
    image : 'https://img.freepik.com/free-photo/medium-shot-bored-people-working_23-2150697629.jpg',
    name : 'Sameh',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
  {
    id : 7,
    image : 'https://img.freepik.com/free-photo/medium-shot-bored-people-working_23-2150697629.jpg',
    name : 'Hany',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
  {
    id : 8,
    image : 'https://media.istockphoto.com/id/536988396/photo/confident-man-in-blue-sweater-portrait.jpg?s=612x612&w=0&k=20&c=Ww3dK11KMRuru6mqddVQ29u0XZxvq_dFghN2Ta6OCN4=',
    name : 'Amir',
    last_message : 'Absolutely! please give me more details about this property',
    phone : '+201283743875'
  },
])

const scrollToSection = () => {
  sectionRef.value!.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

const findExistingChat = async () => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId.value));
    const querySnapshot = await getDocs(q);
    console.log(q);
    console.log(querySnapshot);
    
    for (const docSnap of querySnapshot.docs) {
      const chat = docSnap.data();
      if (chat.participants.includes(receiverId.value)) {
        return docSnap.id;
      }
    }
    return null;
  } catch (error) {
    console.log('Error finding existing chat:', error);
    return null;
  }
};

const createNewChat = async () => {
  loading.value = true;
  try {
    const chatRef = await addDoc(collection(db, 'chats'), {
      participants: [userId.value, receiverId.value],
      lastMessage: '',
      property_mls_id: route.params.id || route.query.id,
      timestamp: serverTimestamp(),
    });

    currentChatId.value = chatRef.id;
    return chatRef.id;
  } catch (error : any) {
    toast.error(error?.message);
    return null;
  } finally {
    loading.value = false;
  }
};

const subscribeToMessages = (chatId : string) => {
  try {
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => {
      messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  } catch (err : any) {
    toast.error(err?.message);
  }
};

onMounted(async () => {
//   scrollToSection();
//   receiverId.value = route.query.agentId;

//   if (!userId.value || !receiverId.value) {
//     toast.error(t('errors.user_required'));
//     loading.value = false;
//     return;
//   }

// console.log(db);


//   const existingChat = await findExistingChat();
//   if (existingChat) {
//     currentChatId.value = existingChat;
//     subscribeToMessages(existingChat);
//   } else {
//     loading.value = false;
//   }
});

const sendMessage = async () => {
  if (!messageText.value.trim()) {
    toast.error(t('errors.enter_message'));
    return;
  }

  let chatId = currentChatId.value;
  if (!chatId) {
    chatId = await createNewChat();
    if (!chatId) return;
    currentChatId.value = chatId;
  }

  const newMessage = {
    text: messageText.value,
    senderId: userId.value,
    receiverId: receiverId.value,
    timestamp: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: messageText.value,
      timestamp: serverTimestamp(),
    });

    messageText.value = '';
    // scrollToSection();
  } catch (error : any) {
    console.log(error);
    
    toast.error(error?.message);
  }
};
</script>

<template>
  <div>
    <div class="grid grid-cols-3 min-h-[73vh]">
        <div class="col-span-1 overflow-y-auto max-h-[73vh] border-r-2 px-3 pr-4 py-2">
            <div @click="currentChatId = chat.id; currentChat = chat" :class="{'bg-[#FFE9E9] rounded-xl' : currentChatId == chat.id}"
            v-for="chat in chats" :key="chat.id" class="flex p-3 mb-3 cursor-pointer items-center gap-3">
                <img :src="chat.image" class="w-[65px] h-[65px] rounded-[50%] object-cover" alt="">
                <div class="">
                    <h2>{{ chat.name }}</h2>
                    <p class="mt-[2px] text-sm font-light">{{ chat.last_message }}</p>
                </div>
            </div>
        </div>
        <div class="col-span-2">
            <div class="w-full flex items-center justify-center h-[50vh]" v-if="!currentChatId && !currentChat">
                <p>No Chat Selected !</p>
            </div>
            <div v-else class="relative h-full">
                <div class="border-b-2 flex items-center gap-5 px-5 py-3">
                    <img :src="currentChat?.image" class="w-[65px] h-[65px] rounded-[50%] object-cover" alt="">
                    <div class="">
                        <h2>{{ currentChat!.name }}</h2>
                        <p class="mt-[2px] text-sm font-light">{{ currentChat!.phone }}</p>
                    </div>
                </div>
                <div class="absolute border-t-2 w-full bottom-0 py-4 px-7 flex justify-between items-center">
                    <input type="text" class="w-3/4" placeholder="Type a message..">
                    <button class="py-3 min-w-[140px] rounded-full bg-[#CE11270D] font-medium text-primary transition-all hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#CE11271A] hover:dark:bg-primary">Send</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your chat styles */
</style>
