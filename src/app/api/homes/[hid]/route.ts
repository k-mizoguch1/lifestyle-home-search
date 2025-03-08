// import { parseCsv } from '@/lib/parseCsv'
import type { Home } from '@/model/home'
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import {getGeocode, searchNearbyPlaces} from '@/lib/gcpApi'

export type GetResponseBody = {
  home: Home
  placesData: Record<string, string[]>
  aiResponse: string
}

const placesData: Record<string, string[]> = {
  supermarket: [],
  shopping_mall: [],
  gym: [],
  drugstore: [],
  restaurant: [],
  park: [],
  hotel: [],
  school: [],
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ hid: string }> },
) {
  let home: Home | undefined

  // try {
  //   const resJson = await parseCsv()
  //   const hid = (await params).hid
  //   home = resJson.find((home) => home.id === hid)
  //   if (!home) {
  //     return NextResponse.json({ error: 'Home not found' }, { status: 404 })
  //   }
  // } catch (error) {
  //   console.error(error)
  //   return NextResponse.json(
  //     { error: 'Failed to get home data from csv.' },
  //     { status: 500 },
  //   )
  // }

  try {
    const apiEndpoint = process.env.BACKEND_API_ENDPOINT
    const apiToken = process.env.BACKEND_API_TOKEN
    if (!apiEndpoint || !apiToken) {
      return NextResponse.json(
        { error: 'サーバーが見つかりません.' },
        { status: 500 },
      )
    }

    const hid = (await params).hid
    const res = await fetch(apiEndpoint + `/homes/${hid}`)
    const resJson = await res.json()
    home = resJson
    if (!home) {
      return NextResponse.json(
        { error: '該当IDの物件情報が見つかりませんでした.' },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get home data from DB.' },
      { status: 500 },
    )
  }

  try {
    const location = await getGeocode(home.location)
    console.log("location", location)
    if (location) {
      const nearbyPlaces = await searchNearbyPlaces(location.lat, location.lng);
      console.log(nearbyPlaces);
      // 各カテゴリーのデータを施設名のリストに変換
      Object.entries(nearbyPlaces).forEach(([key, places]) => {
        if (key in placesData) {
          placesData[key] = places.map(place => place.name);
        }
      });
      console.log(placesData);
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get nearby places.' },
      { status: 500 },
    )
  }

  try {
    const supermarkets = placesData.supermarket.length > 0 ? placesData.supermarket.join(', ') : 'なし'
    const shoppingMalls = placesData.shopping_mall.length > 0 ? placesData.shopping_mall.join(', ') : 'なし'
    const gyms = placesData.gym.length > 0 ? placesData.gym.join(', ') : 'なし'
    const drugstores = placesData.drugstore.length > 0 ? placesData.drugstore.join(', ') : 'なし'
    const restaurants = placesData.restaurant.length > 0 ? placesData.restaurant.join(', ') : 'なし'
    const parks = placesData.park.length > 0 ? placesData.park.join(', ') : 'なし'
    const hotels = placesData.hotel.length > 0 ? placesData.hotel.join(', ') : 'なし'
    const schools = placesData.school.length > 0 ? placesData.school.join(', ') : 'なし'

    const apiKey = process.env.OPENAI_API_KEY
    const openAIClient = new OpenAI({ apiKey: apiKey })
    const openaiRes = await openAIClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'あなたは不動産コンサルタントです。以下の家に住むことで実現できるライフスタイルを説明してください。',
        },
        {
          role: 'user',
          content: `物件情報:\n
            - 物件名: ${home.name}
            - 所在地: ${home.location}
            - 家賃: ${home.rent}円
            - 間取り: ${home.layout}
            - 築年数: ${home.year}年
            - 建物種別: ${home.building}

            周辺施設:\n
            - スーパー: ${supermarkets}
            - ショッピングモール: ${shoppingMalls}
            - ジム: ${gyms}
            - 薬局: ${drugstores}
            - レストラン: ${restaurants}
            - 公園: ${parks}
            - ホテル: ${hotels}
            - 学校: ${schools}

            この家に住むと、どのようなライフスタイルが実現できますか？周辺のスーパーや公園、交通機関などの情報も含めて教えてください。`,
        },
      ],
    })

    const aiResponse = openaiRes.choices[0].message.content

    return NextResponse.json({ home, aiResponse, placesData }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get response from OpenAI' },
      { status: 500 },
    )
  }
}
