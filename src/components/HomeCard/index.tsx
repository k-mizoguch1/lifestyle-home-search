import { Card, CardContent, CardHeader, CardTitle } from '@/_shadcn/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/_shadcn/ui/table'
import type { Home } from '@/model/home'
import Image from 'next/image'

type Props = {
  home: Pick<
    Home,
    'name' | 'rent' | 'year' | 'prefecture' | 'city' | 'layout' | 'building' | 'photo_url' | 'location' | 'heights' | 'area' | 'admin' | 'deposit' | 'station_list' | 'thumbnails'
  >
}

export function HomeCard({ home }: Props) {
  return (
    <Card className="bg-blue-400 rounded-xl p-10">
      <CardHeader>
        <CardTitle>{home.name}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex gap-10">
          <Image 
            alt="物件外観" 
            src={home.photo_url} 
            width={200} 
            height={200}
            layout="intrinsic"
          />
          <Table className="bg-white border border-gray-300">
            <TableBody>
              <TableRow>
                <TableCell className="border border-gray-300 p-3">
                  賃料
                </TableCell>
                <TableCell className="border border-gray-300 p-3">
                  {home.rent}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border border-gray-300 p-3">
                  所在地
                </TableCell>
                <TableCell className="border border-gray-300 p-3">
                  {home.prefecture + ',' + home.city}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border border-gray-300 p-3">
                  築年数
                </TableCell>
                <TableCell className="border border-gray-300 p-3">
                  {home.year}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border border-gray-300 p-3">
                  間取り
                </TableCell>
                <TableCell className="border border-gray-300 p-3">
                  {home.layout}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border border-gray-300 p-3">
                  建物種別
                </TableCell>
                <TableCell className="border border-gray-300 p-3">
                  {home.building}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
