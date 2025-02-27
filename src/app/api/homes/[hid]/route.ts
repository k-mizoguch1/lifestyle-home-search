import { parseCsv } from '@/lib/parseCsv'
import type { Home } from '@/model/home'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ hid: string }> },
) {
  let home: Home | undefined

  try {
    const resJson = await parseCsv()
    const hid = (await params).hid
    home = resJson.find((home) => home.id === hid)
    if (!home) {
      return NextResponse.json({ error: 'Home not found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get home data from csv.' },
      { status: 500 },
    )
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY
    const openAIClient = new OpenAI({ apiKey: apiKey })
    const stream = await openAIClient.chat.completions.create({
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
          - 所在地: ${home.prefecture} ${home.city}
          - 家賃: ${home.rent}円
          - 間取り: ${home.layout}
          - 築年数: ${home.year}年
          - 建物種別: ${home.building}

          この家に住むと、どのようなライフスタイルが実現できますか？`,
        },
      ],
      stream: true, // ストリーミング有効化
    })

    // ストリーミングを送信するための ReadableStream
    const encoder = new TextEncoder()
    const homeJson = JSON.stringify({ home })
    const streamWithHeader = new ReadableStream({
      start(controller) {
        // home のデータを最初に送信
        controller.enqueue(encoder.encode(`data: ${homeJson}\n\n`))

        // OpenAI のレスポンスを流す
        const reader = stream.toReadableStream().getReader()
        async function push() {
          const { done, value } = await reader.read()
          if (done) {
            controller.close()
            return
          }
          controller.enqueue(value)
          push()
        }
        push()
      },
    })

    return new Response(streamWithHeader, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to get response from OpenAI' },
      { status: 500 },
    )
  }
}
