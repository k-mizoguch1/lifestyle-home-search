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
  const [aiResponse, setAiResponse] = useState<string>('')
  
  useEffect(() => {
    setAiResponse('')

    async function fetchHomeDetails() {
      const response = await fetch(`/api/homes/${id}`)
      if (!response.body) {
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      let isHomeReceived = false

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })

        if (!isHomeReceived) {
          // 最初のデータを `home` の情報としてセット
          const match = chunk.match(/data: (.+)/)
          if (match) {
            setHome(JSON.parse(match[1]))
            isHomeReceived = true
          }
        } else {
          // OpenAI のレスポンスをリアルタイムにセット
          result += chunk
          setAiResponse((prev) => prev + chunk)
        }
      }
    }

    fetchHomeDetails()
  }, [id])

  // useEffect(() => {
  //   async function fetchHome() {
  //     try {
  //       const res = await fetch(`/api/homes/${id}`)
  //       const resJson = await res.json()
  //       if (res.status === 200) {
  //         setHome(resJson)
  //       } else {
  //         console.error(resJson.error)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchHome()
  // }, [id])

  return (
    <>
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
      <p className="mt-4 whitespace-pre-line">{aiResponse}</p>
    </>
  )
}
