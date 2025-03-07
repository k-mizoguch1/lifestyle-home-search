import ReactMarkdown from 'react-markdown'
type Props = {
  aiResponse: string
}
export function AiAdvise({ aiResponse }: Props) {
  return (
    <div className="mt-4 whitespace-pre-line text-black py-10 px-20 rounded-3xl bg-[#FFE492]">
      <p className="py-6 text-2xl font-bold">この物件での生活は...</p>
      <ReactMarkdown>{aiResponse}</ReactMarkdown>
    </div>
  )
}
