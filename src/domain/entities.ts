export type Message = UserMessageType | LLamaMessageType

export type UserMessageType = {
  type: 'user'
  id: string
  prompt: string
}

export type LLamaMessageType = {
  type: 'llama'
  id: string
  answer: string
  prompt: string
  createdAt: string
}

export type LLamaResponse = {
  id: string
  prompt: string
  answer: string
  createdAt: string
}
