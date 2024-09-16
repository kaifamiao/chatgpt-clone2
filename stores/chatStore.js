import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
    const chatList = ref([])
    const activeChatId = ref(null)

    const createChat = () => {
        const newChat = {
            id: Date.now(),
            title: '',
            messages: [],
        }
        chatList.value.push(newChat)
        activeChatId.value = newChat.id
    }

    const setActiveChat = (id) => {
        activeChatId.value = id
    }

    const addMessageToChat = (message) => {
        const chat = chatList.value.find((c) => c.id === activeChatId.value)
        if (chat) {
            chat.messages.push(message)
        }
    }

    return {
        chatList,
        activeChatId,
        createChat,
        setActiveChat,
        addMessageToChat,
    }
})
