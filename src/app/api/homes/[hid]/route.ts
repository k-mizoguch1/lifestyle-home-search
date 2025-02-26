import { parseCsv } from '@/lib/parseCsv'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ hid: string }> },
) {
  try {
    const resJson = await parseCsv()
    const hid = (await params).hid
    const home = resJson.find((home) => home.id === hid)
    return NextResponse.json(home, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get home data.' },
      { status: 500 },
    )
  }
}
