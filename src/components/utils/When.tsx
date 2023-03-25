import { ReactNode } from 'react'

type WhenProps = {
  condition: boolean
  children: ReactNode
  fallback?: ReactNode
}

export default function When({ condition, children, fallback }: WhenProps) {
  if (condition) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
