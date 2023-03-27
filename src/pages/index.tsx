import axios from 'axios'
import { toast } from 'react-toastify'
import { useRef, useEffect, Fragment, useMemo } from 'react'
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

import { uuid } from '@/utils/uuid'
import { preventDefault } from '@/utils/ui'
import { filterUserMessages } from '@/domain/utilities'
import useChatReducer, { actions } from '@/reducers/chat'

import Head from 'next/head'

import UserMessage from '@/components/messages/UserMessage'
import LLamaMessage from '@/components/messages/LLamaMessage'
import LLamaWaitingMessage from '@/components/messages/LLamaWaitingMessage'
import StarterMessage from '@/components/messages/StarterMessage'

import MessageNav from '@/components/common/MessageNav'
import When from '@/components/utils/When'

import type { LLamaResponse, Message } from '@/domain/entities'

export default function Chat() {
  const {
    state: { loading, messages },
    dispatch,
  } = useChatReducer()

  const bottomMessagesRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const userMessages = useMemo(() => filterUserMessages(messages), [messages])

  const handleClearChat = () => dispatch(actions.clearMessages())

  const handlePrompt = async () => {
    const form = formRef.current!
    const formData = new FormData(form)
    const prompt = formData.get('prompt') as string

    if (!prompt) {
      return
    }

    form.reset()

    const message: Message = {
      id: uuid(),
      type: 'user',
      prompt,
    }

    dispatch(actions.addMessage(message))
    dispatch(actions.setLoading(true))

    try {
      const { data: message } = await axios.post<LLamaResponse>('/api/prompt', {
        prompt,
      })

      const llamaMessage: Message = {
        type: 'llama',
        ...message,
      }

      dispatch(actions.addMessage(llamaMessage))
    } catch (err) {
      toast.error('Something went wrong, please try again later. :(')
    } finally {
      dispatch(actions.setLoading(false))
    }
  }

  useEffect(() => {
    bottomMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex h-screen max-h-screen w-full bg-zinc-900 text-white">
      <Head>
        <title>Talk to LLaMA</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <MessageNav messages={userMessages} />
      <main className="relative col-span-3 flex max-h-screen w-full flex-col overflow-auto">
        <When condition={messages.length !== 0} fallback={<StarterMessage />}>
          <div className="flex flex-1 flex-col">
            {messages.map((message) => (
              <Fragment key={message.id}>
                {message.type === 'user' ? (
                  <UserMessage message={message} name={'Guest'} />
                ) : (
                  <LLamaMessage message={message} />
                )}
              </Fragment>
            ))}
            <When condition={loading}>
              <LLamaWaitingMessage />
            </When>
            <div
              className="bottom-ref"
              aria-label="hidden"
              ref={bottomMessagesRef}
            />
          </div>
        </When>

        <div className="sticky bottom-0 w-full bg-zinc-900 py-4">
          <form
            className="mx-auto flex w-full max-w-screen-md gap-4 px-4 lg:p-0 "
            onSubmit={preventDefault(handlePrompt)}
            ref={formRef}
          >
            <input
              type="text"
              name="prompt"
              className="
                mt-auto
                w-full
                rounded-full
                border
                border-zinc-700
                bg-zinc-800
                px-4
                py-2
                text-zinc-300
                outline-none
                transition
                ease-in-out
                focus:border-transparent
                focus:ring-2
                focus:ring-purple-600
              "
              placeholder="Ask me anything... 🦙"
              autoComplete="off"
              disabled={loading}
            />
            <button type="button" onClick={handleClearChat} disabled={loading}>
              <ArrowPathIcon className="h-6 w-6 text-purple-500" />
            </button>
            <button type="submit" disabled={loading}>
              <PaperAirplaneIcon className="h-6 w-6 text-purple-500" />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
