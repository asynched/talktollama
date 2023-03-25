import type { LLamaMessageType } from '@/domain/entities'
import { getAvatar } from '@/utils/avatar'
import { delay } from '@/utils/promises'
import { randomInterval } from '@/utils/random'
import { useEffect, useState } from 'react'

type LLamaMessageProps = {
  message: LLamaMessageType
}

export default function LLamaMessage({ message }: LLamaMessageProps) {
  const [text, setText] = useState('')

  const slowlyWrite = (
    text: string,
    callback: (text: string) => unknown,
    onDone?: (text: string) => unknown,
  ) => {
    const words = text.split(' ').filter(Boolean)
    let cancel = false

    ;(async () => {
      for (let index = 0; index < words.length; index++) {
        if (cancel) {
          break
        }

        await delay(randomInterval(100, 200))
        callback(words.slice(0, index + 1).join(' '))

        if (index === words.length - 1) {
          onDone?.(words.slice(0, index + 1).join(' '))
        }
      }
    })()

    return () => {
      cancel = true
    }
  }

  useEffect(() => slowlyWrite(message.answer, setText), [message.answer])

  return (
    <div className="bg-zinc-800 px-4 lg:px-0" key={message.id}>
      <div className="mx-auto flex w-full max-w-screen-md items-start gap-4 py-6">
        <img src={getAvatar('LLaMA')} alt="LLaMA" height="32" width="32" />
        <p className="whitespace-pre-wrap text-zinc-300">{text}</p>
      </div>
    </div>
  )
}
