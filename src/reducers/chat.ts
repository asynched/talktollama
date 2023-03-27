import { useReducer } from 'react'
import { Message } from '@/domain/entities'

const INITIAL_STATE = {
  messages: [] as Message[],
  loading: false,
}

type State = typeof INITIAL_STATE

const reducer = (state: State, action: (state: State) => Partial<State>) => ({
  ...state,
  ...action(state),
})

export const actions = {
  addMessage: (message: Message) => (state: State) => ({
    messages: [...state.messages, message],
  }),
  clearMessages: () => () => ({
    messages: [],
  }),
  setLoading: (loading: boolean) => () => ({
    loading,
  }),
}

export default function useChatReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return {
    state,
    dispatch,
  }
}
