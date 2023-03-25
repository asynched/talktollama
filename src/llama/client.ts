import axios, { AxiosInstance } from 'axios'

type LLaMAResponse = {
  completion: string
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
}

export class LLaMA {
  constructor(
    private httpClient: AxiosInstance = axios.create({
      baseURL: process.env.NEXT_APP_LLAMA_API_URL,
      headers: DEFAULT_HEADERS,
    }),
  ) {}

  async getCompletion(prompt: string): Promise<LLaMAResponse> {
    const { data } = await this.httpClient.post<LLaMAResponse>(
      '/run-inference-1',
      { prompt },
    )

    return data
  }
}
