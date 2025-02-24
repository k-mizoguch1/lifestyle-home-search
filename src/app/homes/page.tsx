'use client'
import type { Home } from '@/app/model/home'
import { useEffect, useState } from 'react'

export default function Home() {
  const [homes, setHomes] = useState<Home[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/home')
      const result = await response.json()
      setHomes(result)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>賃貸情報一覧</h1>
    </div>
  )
}
