'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/_shadcn/ui/breadcrumb'
import { Button } from '@/_shadcn/ui/button'
import type { Home } from '@/model/home'
import Link from 'next/link'
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
    <main>
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
      <div>
        <p>物件名</p>
        <Button className="border rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
          <Link href="/homes/1">物件詳細を見る</Link>
        </Button>
      </div>
    </main>
  )
}
