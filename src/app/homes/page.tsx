'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/_shadcn/ui/breadcrumb'
import { Button } from '@/_shadcn/ui/button'
import { HomeCard } from '@/components/HomeCard'
import { Loading } from '@/components/Loading'
import type { Home } from '@/model/home'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [homes, setHomes] = useState<Home[]>([])
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    setLoading(true)

    async function fetchData() {
      const res = await fetch(`/api/homes?${searchParams.toString()}`)
      const resJson = await res.json()
      setHomes(resJson)
    }

    fetchData()

    setLoading(false)
  }, [searchParams])

  return (
    <main>
      <Loading loading={loading} />

      <Breadcrumb className="my-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">物件検索</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/homes">物件一覧</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1>物件情報一覧</h1>
      {homes.length !== 0 ? (
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
      )}
    </main>
  )
}
