"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  let fadeOutTimeout: NodeJS.Timeout;

  // ログイン状態を確認
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // トークン削除
    setIsLoggedIn(false); // 状態更新
    router.push("/login"); // ログインページへリダイレクト
  };

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
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="text-white text-2xl">&#9776;</button>
          {menuOpen && (
            <div
              className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden transition-opacity duration-500 ease-in-out ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              {isLoggedIn ? (
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 border-b cursor-pointer hover:bg-gray-100"
                >
                  <span>ログアウト</span>
                </div>
              ) : (
                <Link href="/login">
                  <div className="flex items-center gap-2 px-4 py-3 border-b cursor-pointer hover:bg-gray-100">
                    <span>ログイン</span>
                  </div>
                </Link>
              )}
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
