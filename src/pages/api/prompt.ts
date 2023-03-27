import { NextApiHandler } from 'next'
import { LLaMA } from '@/llama/client'
import { uuid } from '@/utils/uuid'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const prompt = req.body.prompt

  if (!prompt) {
    return res.status(400).json({ message: 'Missing prompt' })
  }

  try {
    const client = new LLaMA()
    const answer = await client.getCompletion(prompt)

    return res.status(200).json({
      id: uuid(),
      prompt: prompt,
      answer: answer.completion,
      createdAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Error:', err)

    return res.status(500).json({
      error: err,
      message: 'Model timeout',
    })
  }
}

export default handler
