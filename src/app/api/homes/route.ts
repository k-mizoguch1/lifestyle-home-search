import { NextResponse } from 'next/server'
// import { filterHomes } from '@/lib/filterHomes'
// import { parseCsv } from '@/lib/parseCsv'

export async function GET(req: Request) {
  try {
    // const jsonData = await parseCsv()

    // if (jsonData.length === 0) {
    //   return NextResponse.json(
    //     { error: 'Failed to read data from CSV file' },
    //     { status: 500 },
    //   )
    // }

    // const params = {
    //   selectedCities: searchParams.get('cities')?.split(',') || null,
    //   minRent: searchParams.get('min_rent') || null,
    //   maxRent: searchParams.get('max_rent') || null,
    //   layouts: searchParams.get('layouts')?.split(',') || null,
    //   year: searchParams.get('year') || null,
    //   buildings: searchParams.get('buildings')?.split(',') || null,
    // }

    // const filteredHomes = filterHomes(jsonData, { ...params })

    const apiEndpoint = process.env.BACKEND_API_ENDPOINT
    const apiToken = process.env.BACKEND_API_TOKEN
    if (!apiEndpoint || !apiToken) {
      return NextResponse.json(
        { error: 'サーバーが見つかりません．' },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(req.url)
    const res = await fetch(apiEndpoint + `/homes?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
    })
    const resJson = await res.json()

    return NextResponse.json(resJson, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get data from DB.' },
      { status: 500 },
    )
  }
}
