import { preventDefault } from '@/utils/ui'

type UserNameModalProps = {
  onSetName: (name: string) => void
}

export default function UserNameModal({ onSetName }: UserNameModalProps) {
  const handleSetName = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string

    form.reset()

    if (!name) {
      return
    }

    onSetName(name)
  }

  return (
    <div className="absolute z-10 grid h-screen w-full place-items-center bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="mx-4 max-w-[32rem] rounded-lg border border-zinc-800 bg-zinc-900 p-8 md:mx-0">
        <h1 className="mb-2 text-center text-4xl font-bold tracking-tighter">
          Talk to LLaMA
        </h1>
        <p className="mb-4 text-center text-zinc-400">
          This is an experimental project to test generative text models. Your
          personal info is merely used to personalize the experience.
        </p>
        <form
          onSubmit={preventDefault(handleSetName)}
          className="flex flex-col"
        >
          <div className="mb-4 flex flex-col">
            <label className="mb-1 font-medium" htmlFor="name">
              What is your name?
            </label>
            <input
              className="rounded-lg border border-zinc-700 bg-zinc-800 py-2 px-4 outline-none transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-purple-600"
              type="text"
              name="name"
              placeholder="John Doe..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="submit"
              className="rounded-lg border border-transparent bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 py-2 px-4 text-sm transition ease-in-out hover:shadow-lg hover:shadow-purple-600/25 hover:brightness-110"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => onSetName('Guest')}
              className="rounded-lg border border-zinc-700 bg-zinc-800 py-2 px-4 text-sm transition ease-in-out hover:border-red-600 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/25"
            >
              Enter as guest
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
