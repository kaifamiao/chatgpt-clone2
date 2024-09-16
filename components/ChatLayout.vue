<template>
  <div class="chat-container">
    <aside class="chat-sidebar">
      <div class="sidebar-header">
        <button @click="createNewChat">新建聊天</button>
      </div>
      <ul class="chat-history">
        <li
            v-for="(chat, index) in chatList"
            :key="index"
            :class="{ active: chat.id === activeChatId }"
            @click="selectChat(chat.id)"
        >
          {{ chat.title || '未命名对话' }}
        </li>
      </ul>
    </aside>
    <main class="chat-main">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useChatStore } from '~/stores/chatStore'

const chatStore = useChatStore()
const chatList = chatStore.chatList
const activeChatId = chatStore.activeChatId

const createNewChat = () => {
  chatStore.createChat()
}

const selectChat = (id) => {
  chatStore.setActiveChat(id)
}
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
}

.chat-sidebar {
  width: 300px;
  background-color: #f5f5f5;
  overflow-y: auto;
  border-right: 1px solid #ddd;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
}

.chat-history {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-history li {
  padding: 15px 20px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.chat-history li.active {
  background-color: #e0e0e0;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
