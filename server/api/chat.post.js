export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid messages format',
        })
    }

    // 在这里调用您的后端聊天服务，例如 OpenAI API
    // 这里我们模拟一个简单的回复
    const lastMessage = messages[messages.length - 1]
    const reply = {
        role: 'assistant',
        content: `您说的是：“${lastMessage.content}”`,
    }

    return { reply }
})
