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
import { Home } from '@/model/home'

type Props = {
  home: Home | null
}

export function HomeDescription({ home }: Props) {
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
    </>
  )
}
