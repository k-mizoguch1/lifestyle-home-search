import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-[#043873] shadow-md py-4 px-6 flex justify-between items-center sticky top-0">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gray-800 cursor-pointer flex gap-5">
          <Image src="/icon.svg" alt="たぐっとホーム" width={40} height={40} />
          <p className="text-white">たぐっとホーム</p>
        </h1>
      </Link>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Sign In
      </button>
    </header>
  )
}
