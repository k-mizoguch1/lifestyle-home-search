'use client'
import { Button } from '@/_shadcn/ui/button'
import { HomeCard } from '@/components/HomeCard'
import type { Home } from '@/model/home'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Homes() {
  const [homes, setHomes] = useState<Home[]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/homes?${searchParams.toString()}`)
      const resJson = await res.json()
      setHomes(resJson)
    }

    fetchData()
  }, [searchParams])

  return homes.length !== 0 ? (
    homes.map((home) => (
      <div key={home.id} className="my-5">
        <HomeCard home={home} />
        <Button className="border rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
          <Link href={`/homes/${home.id}`}>物件詳細を見る</Link>
        </Button>
      </div>
    ))
  ) : (
    <p>物件情報がありません</p>
  )
}
