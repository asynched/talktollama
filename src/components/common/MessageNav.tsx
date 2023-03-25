import When from '@/components/utils/When'
import type { UserMessageType } from '@/domain/entities'

type MessageNavProps = {
  messages: UserMessageType[]
}

export default function MessageNav({ messages }: MessageNavProps) {
  return (
    <nav className="hidden h-screen max-h-screen w-[20rem] overflow-auto border-r border-zinc-700 bg-zinc-800 p-8 md:block">
      <h1 className="mb-2 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
        Messages
      </h1>
      <p className="mb-4">Your previous messages will appear here.</p>
      <When
        condition={messages.length > 0}
        fallback={
          <div className="rounded-lg border-2 border-dashed border-zinc-700 py-2 px-4 text-center text-sm text-zinc-400">
            Nothing to see here 👻
          </div>
        }
      >
        <ul className="grid gap-4">
          {messages.map((message) => (
            <li
              className="cursor-default rounded-lg border border-zinc-700 py-2 px-4 text-sm text-zinc-400 transition ease-in-out hover:border-zinc-600 hover:bg-zinc-700 hover:text-zinc-200"
              key={message.id}
            >
              <p>{message.prompt}</p>
            </li>
          ))}
        </ul>
      </When>
    </nav>
  )
}
