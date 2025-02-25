'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/_shadcn/ui/breadcrumb'
import { Button } from '@/_shadcn/ui/button'
import { Label } from '@/_shadcn/ui/label'
import Link from 'next/link'

const mainCities = ['千代田区', '中央区', '港区', '新宿区', '文京区', '渋谷区']
const cities = [
  '台東区',
  '墨田区',
  '江東区',
  '品川区',
  '目黒区',
  '大田区',
  '世田谷区',
  '中野区',
  '杉並区',
  '豊島区',
  '北区',
  '荒川区',
  '板橋区',
  '練馬区',
  '足立区',
  '葛飾区',
  '江戸川区',
]
const tokas = [
  '八王子市',
  '立川市',
  '武蔵野市',
  '三鷹市',
  '青梅市',
  '府中市',
  '昭島市',
  '調布市',
  '町田市',
  '小金井市',
  '小平市',
  '日野市',
  '東村山市',
  '国分寺市',
  '国立市',
  '福生市',
  '狛江市',
  '東大和市',
  '清瀬市',
  '東久留米市',
  '武蔵村山市',
  '多摩市',
  '稲城市',
  '羽村市',
  'あきる野市',
  '西東京市',
  '瑞穂町',
  '日の出町',
  '檜原村',
  '奥多摩町',
  '大島町',
  '利島村',
  '新島村',
  '神津島村',
  '三宅村',
  '御蔵島村',
  '八丈町',
  '青ヶ島村',
  '小笠原村',
]

export default function Home() {
  return (
    <main>
      <Breadcrumb className="my-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">物件検索</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-10 text-center text-6xl font-bold">
        グッとくるお部屋に出会おう
      </div>

      <div>
        <p className="text-xl font-bold bg-blue-300 px-3">東京都-都心部</p>
        <div className="grid gap-2 grid-cols-4 mx-10 my-5">
          {mainCities.map((mainCity, idx) => (
            <div key={idx} className="items-top flex space-x-2">
              <input id={idx.toString()} type="checkbox" />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={idx.toString()}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {mainCity}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xl font-bold bg-blue-300 px-3">東京都-23区</p>
        <div className="grid gap-2 grid-cols-4 mx-10 my-5">
          {cities.map((city, idx) => (
            <div key={idx} className="items-top flex space-x-2">
              <input id={idx.toString()} type="checkbox" />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={idx.toString()}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {city}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xl font-bold bg-blue-300 px-3">東京都-都下</p>
        <div className="grid gap-2 grid-cols-4 mx-10 my-5">
          {tokas.map((toka, idx) => (
            <div key={idx} className="items-top flex space-x-2">
              <input id={idx.toString()} type="checkbox" />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={idx.toString()}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {toka}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center my-10">
        <Button
          className="border rounded-lg border-black bg-blue-500 hover:bg-blue-600 text-white"
          variant={'outline'}
        >
          <Link href={'/homes'}>検索</Link>
        </Button>
      </div>
    </main>
  )
}
