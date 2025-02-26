'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_shadcn/ui/table'
import type { Home } from '@/model/home'
import { useEffect, useState } from 'react'

type Props = {
  id: string
}
export function HomeById({ id }: Props) {
  const [home, setHome] = useState<Home | null>(null)

  useEffect(() => {
    async function fetchHome() {
      const res = await fetch(`/api/homes/${id}`)
      const resJson = await res.json()
      if (res.status === 200) {
        setHome(resJson)
      }
    }
    fetchHome()
  }, [id])

  return (
    <Table>
      <TableCaption>物件詳細情報</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>物件名</TableHead>
          <TableHead>住所</TableHead>
          <TableHead>家賃</TableHead>
          <TableHead>間取り</TableHead>
          <TableHead>築年数</TableHead>
          <TableHead>建物種別</TableHead>
        </TableRow>
      </TableHeader>
      {home ? (
        <TableBody>
          <TableRow key={home.id}>
            <TableCell>{home.name}</TableCell>
            <TableCell>{home.prefecture + home.city}</TableCell>
            <TableCell>{home.rent}</TableCell>
            <TableCell>{home.layout}</TableCell>
            <TableCell>{home.year}</TableCell>
            <TableCell>{home.building}</TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell colSpan={6}>物件情報がありません</TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  )
}
