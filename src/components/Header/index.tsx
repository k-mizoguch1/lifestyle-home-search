"use client";

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  let fadeOutTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    setMenuOpen(true);
    setFadeOut(false);
    clearTimeout(fadeOutTimeout);
  };

  const handleMouseLeave = () => {
    fadeOutTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setMenuOpen(false), 500);
    }, 500);
  };

  return (
    <header className="bg-[#043873] py-4 px-6 flex justify-between items-center relative">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/icon.svg" alt="たぐっとホーム" width={40} height={40} />
          <p className="text-white text-lg">たぐっとホーム</p>
        </div>
      </Link>
      <div className="flex items-center gap-4 relative">
        <Link href="/loginlogin">
          <button className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
            Login
          </button>
        </Link>
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="text-white text-2xl">
            &#9776;
          </button>
          {menuOpen && (
            <div 
              className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            >
              <Link href="/login">
                <div className="flex items-center gap-2 px-4 py-3 border-b cursor-pointer hover:bg-gray-100">
                  <span>ログイン</span>
                </div>
              </Link>
              <Link href="/favorites">
                <div className="flex items-center gap-2 px-4 py-3 border-b cursor-pointer hover:bg-gray-100">
                  <span>お気に入りの物件</span>
                </div>
              </Link>
              <Link href="/history">
                <div className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100">
                  <span>閲覧履歴</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
