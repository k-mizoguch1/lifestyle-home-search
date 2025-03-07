import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/_shadcn/ui/breadcrumb'
import { FetchContainer } from '@/components/FetchContainer'
import { Loading } from '@/components/Loading'
import { Suspense } from 'react'

export default async function Home({
  params,
}: {
  params: Promise<{ hid: string }>
}) {
  const hid = (await params).hid
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
            <BreadcrumbLink href={`/${hid}`}>物件詳細</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1>物件ID:{hid}の詳細ページ</h1>
      <Suspense fallback={<Loading loading={true} />}>
        <FetchContainer id={hid} />
      </Suspense>
    </main>
  )
}
