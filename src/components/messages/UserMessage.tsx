import { getAvatar } from '@/utils/avatar'
import type { UserMessageType } from '@/domain/entities'

type UserMessageProps = {
  message: UserMessageType
  name: string
}

export default function UserMessage({ message, name }: UserMessageProps) {
  return (
    <div
      className="mx-auto flex w-full max-w-screen-md items-start gap-4 px-4 py-6 lg:px-0"
      key={message.id}
    >
      <img width="32" height="32" src={getAvatar(name)} alt={name} />
      <p className="text-zinc-300">{message.prompt}</p>
    </div>
  )
}
