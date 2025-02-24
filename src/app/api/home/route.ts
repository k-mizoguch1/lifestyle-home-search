import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data.csv')

    const fileContent = await fs.readFile(filePath, 'utf-8')

    const rows = fileContent.split('\n').map((row) => row.split(','))
    const headers = rows.shift()

    const jsonData = rows.map((row) => {
      return headers?.reduce(
        (acc, header, index) => {
          acc[header] = row[index]
          return acc
        },
        {} as Record<string, string>,
      )
    })

    return NextResponse.json(jsonData)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to read CSV file' },
      { status: 500 },
    )
  }
}
