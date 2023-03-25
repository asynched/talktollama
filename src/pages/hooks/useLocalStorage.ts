import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialData: T,
): [T, (data: T) => void]

export default function useLocalStorage<T>(key: string, initialData?: T) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const data = localStorage.getItem(key)
    if (data) {
      setData(JSON.parse(data))
    }
  }, [key, setData])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [key, data])

  return [data, setData]
}
