<template>
  <ChatLayout>
    <ChatWindow v-if="activeChat" />
    <div v-else class="no-chat">
      <p>请选择一个聊天或新建聊天。</p>
    </div>
  </ChatLayout>
</template>

<script setup>
import ChatLayout from '~/components/ChatLayout.vue'
import ChatWindow from '~/components/ChatWindow.vue'
import { computed } from 'vue'
import { useChatStore } from '~/stores/chatStore'

const chatStore = useChatStore()
const activeChat = computed(() =>
    chatStore.chatList.find((c) => c.id === chatStore.activeChatId)
)
</script>

<style scoped>
.no-chat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 18px;
  color: #888;
}
</style>
