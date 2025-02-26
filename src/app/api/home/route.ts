import { parseCsv } from '@/lib/parseCsv'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json(await parseCsv(), { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to read CSV file' },
      { status: 500 },
    )
  }
}
