'use client'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_shadcn/ui/card'
import { Home } from '@/model/home'
import { MapPin, HomeIcon, DollarSign, LayoutGrid, Calendar } from 'lucide-react'

type Props = {
  home: Home | null
}

export function HomeDescription({ home }: Props) {
  if (!home) {
    return (
      <Card className="p-6 text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">物件詳細情報</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-500">物件情報がありません</CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">{home.name}</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* 物件画像 */}
          <div className="w-full md:w-1/2 flex">
            <Image
              src={home.photo_url}
              alt="物件外観"
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* 物件情報 */}
          <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-center">
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{home.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-lg font-semibold text-gray-900">{home.rent.toLocaleString()} 円</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <LayoutGrid className="w-5 h-5 text-purple-500" />
              <span className="font-medium">{home.layout}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="font-medium">築 {home.year} 年</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <HomeIcon className="w-5 h-5 text-red-500" />
              <span className="font-medium">{home.building}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
