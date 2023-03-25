export default function StarterMessage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600"></div>
      <h2 className="bg-gradient-to-br from-pink-400 to-purple-500 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
        Talk to LLaMA
      </h2>
      <p className="mb-4 text-zinc-300">
        Talk to the pre-trained LLM transformer AI
      </p>
      <a
        className="rounded-lg bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 py-2 px-4 text-white transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-600/25 hover:brightness-110"
        target="_blank"
        href="https://github.com/asynched/talktollama"
      >
        Check the project on GitHub
      </a>
    </div>
  )
}
