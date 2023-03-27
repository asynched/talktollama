import type { Message, UserMessageType } from './entities'

export const filterUserMessages = (messages: Message[]): UserMessageType[] =>
  messages.filter((message) => message.type === 'user') as UserMessageType[]
