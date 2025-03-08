'use client'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_shadcn/ui/card'
import { Home } from '@/model/home'
import { MapPin, HomeIcon, DollarSign, LayoutGrid, Calendar, Map } from 'lucide-react'

type Props = {
  home: Home | null
  placesData: Record<string, string[]> // 追加: 周辺施設情報
}

const PLACE_TYPES: Partial<Record<string, string>> = {
  supermarket: 'スーパーマーケット',
  shopping_mall: 'ショッピングモール',
  gym: 'ジム',
  drugstore: 'ドラッグストア',
  restaurant: 'レストラン',
  park: '公園',
  hotel: 'ホテル',
  school: '学校',
};


export function HomeDescription({ home, placesData }: Props) {
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
    <div className="space-y-8">
      {/* 物件情報カード */}
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

      {/* 周辺施設情報カード（画面幅を広げ、横並び表示） */}
      <Card className="max-w-6xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg border-t-4 border-blue-500">
        <CardHeader>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Map className="w-6 h-6 text-blue-500" /> 周辺施設情報
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(placesData).map(([category, places]) => (
              <div
                key={category}
                className="bg-gray-50 p-5 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <h4 className="text-lg font-medium text-gray-800 border-b pb-1 mb-2">{PLACE_TYPES[category]}</h4>
                {places.length > 0 ? (
                  <ul className="space-y-1 text-gray-600">
                    {places.map((place, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {place}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic text-sm mt-2">なし</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
