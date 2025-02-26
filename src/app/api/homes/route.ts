import { filterHomes } from '@/lib/filterHomes'
import { parseCsv } from '@/lib/parseCsv'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const jsonData = await parseCsv()

    if (jsonData.length === 0) {
      return NextResponse.json(
        { error: 'Failed to read data from CSV file' },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(req.url)
    const params = {
      selectedCities: searchParams.get('selectedCities')?.split(',') || null,
      minRent: searchParams.get('minRent') || null,
      maxRent: searchParams.get('maxRent') || null,
      layouts: searchParams.get('layouts')?.split(',') || null,
      year: searchParams.get('year') || null,
      buildings: searchParams.get('buildings')?.split(',') || null,
    }

    const filteredHomes = filterHomes(jsonData, { ...params })

    return NextResponse.json(filteredHomes, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get data from CSV file' },
      { status: 500 },
    )
  }
}
