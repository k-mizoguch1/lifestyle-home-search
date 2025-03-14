'use client'
import { GetResponseBody } from '@/app/api/homes/[hid]/route'
import { HomeDescription } from '@/components/HomeDescription'
import type { Home } from '@/model/home'
import { useEffect, useState } from 'react'
import { AiAdvise } from '../AiAdvise'
import { Loading } from '../Loading'

type Props = {
  id: string
}

export function FetchContainer({ id }: Props) {
  const [home, setHome] = useState<Home | null>(null)
  const [placesApiResponse, setPlacesApiResponse] = useState<Record<string, string[]>>({})
  const [aiResponse, setAiResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchHomeDetails() {
      try {
        setLoading(true)
        const res = await fetch(`/api/homes/${id}`)
        const resJson: GetResponseBody = await res.json()
        // console.log(resJson)

        if (res.status === 200) {
          setHome(resJson.home)
          setPlacesApiResponse(resJson.placesData)
          setAiResponse(resJson.aiResponse)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }

    fetchHomeDetails()
  }, [id])

  return (
    <>
      {loading ? (
        <Loading loading={true} />
      ) : (
        <>
          <HomeDescription home={home} placesData={placesApiResponse} />
          <AiAdvise aiResponse={JSON.parse(aiResponse)} />
          <div style={{ marginBottom: "40px" }} /> {/* 余白を追加 */}
        </>
      )}
    </>
  )
}
