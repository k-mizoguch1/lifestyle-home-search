import { Footer } from '@/components/Footer'

import { Header } from '@/components/Header'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'たぐっとホーム',
  description: 'ライフスタイル提案機能付き物件検索アプリ',
  icons: { icon: '/icon.svg' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`antialiased font-sans`}>
        <Header />
        <div className="container mx-auto px-6">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
