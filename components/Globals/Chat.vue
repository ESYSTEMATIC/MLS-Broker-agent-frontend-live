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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

const { t } = useI18n();
// const { data: session } = useSession();
const route = useRoute();
const toast = useToast();
const props = defineProps<{receiverId : string}>()
const messages : any = ref([]);
const messageText = ref('');
const currentChatId : any = ref(null);
const loading = ref(true);
const receiverId : any = ref(props.receiverId);
const sectionRef = ref(null);
const userId = ref('');

const scrollToSection = () => {
  sectionRef.value!.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

const findExistingChat = async () => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId.value));
    const querySnapshot = await getDocs(q);

    for (const docSnap of querySnapshot.docs) {
      const chat = docSnap.data();
      if (chat.participants.includes(receiverId.value)) {
        return docSnap.id;
      }
    }
    return null;
  } catch (error) {
    console.error('Error finding existing chat:', error);
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

  if (!userId.value || !receiverId.value) {
    toast.error(t('errors.user_required'));
    loading.value = false;
    return;
  }

  const existingChat = await findExistingChat();
  if (existingChat) {
    currentChatId.value = existingChat;
    subscribeToMessages(existingChat);
  } else {
    loading.value = false;
  }
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
    <div v-if="loading">{{ t('labels.loading') }}</div>
    <div v-else>
      <div v-for="msg in messages" :key="msg.id">
        <p>{{ msg.text }}</p>
      </div>
      <input v-model="messageText" @keydown.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<style scoped>
/* Add your chat styles */
</style>
