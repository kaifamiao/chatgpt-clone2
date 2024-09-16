<template>
  <div class="chat-window">
    <div class="chat-messages">
      <div
          v-for="(message, index) in activeChat.messages"
          :key="index"
          :class="['message', message.role]"
      >
        <div class="message-content">
          {{ message.content }}
        </div>
      </div>
    </div>
    <form class="chat-input" @submit.prevent="sendMessage">
      <textarea v-model="inputMessage" placeholder="输入您的消息..." required></textarea>
      <button type="submit">发送</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChatStore } from '~/stores/chatStore'

const chatStore = useChatStore()
const inputMessage = ref('')

const activeChat = computed(() =>
    chatStore.chatList.find((c) => c.id === chatStore.activeChatId)
)

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  // 用户消息
  const userMessage = {
    role: 'user',
    content: inputMessage.value,
  }
  chatStore.addMessageToChat(userMessage)

  inputMessage.value = ''

  // 模拟机器人回复
  const botMessage = {
    role: 'assistant',
    content: '这是自动回复的消息。',
  }
  chatStore.addMessageToChat(botMessage)
}
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin-bottom: 15px;
}

.message.user .message-content {
  background-color: #d1e7dd;
  align-self: flex-end;
}

.message.assistant .message-content {
  background-color: #f8d7da;
  align-self: flex-start;
}

.message-content {
  padding: 10px 15px;
  border-radius: 10px;
  max-width: 60%;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.chat-input textarea {
  flex: 1;
  resize: none;
  padding: 10px;
}

.chat-input button {
  padding: 10px 20px;
}
</style>
