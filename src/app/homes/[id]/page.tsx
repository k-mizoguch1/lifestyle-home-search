import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/_shadcn/ui/breadcrumb'
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

const home: Home = {
  id: '1',
  name: 'ハイツ新宿',
  prefecture: '東京都',
  city: '新宿区',
  rent: 100000,
  layout: '1K',
  year: 5,
  building: 'マンション',
}

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/1">物件詳細</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1>物件ID:{id}の詳細ページ</h1>
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
      </Table>
    </main>
  )
}
