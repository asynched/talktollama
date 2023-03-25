import { getAvatar } from '@/utils/avatar'

export default function LLamaWaitingMessage() {
  return (
    <div className="bg-zinc-800 px-4 lg:px-0">
      <div className="mx-auto flex w-full max-w-screen-md items-start gap-4 py-6">
        <img src={getAvatar('LLaMA')} alt="LLaMA" height="32" width="32" />
        <div className="my-auto flex gap-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-300"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-300"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-300"></div>
        </div>
      </div>
    </div>
  )
}
