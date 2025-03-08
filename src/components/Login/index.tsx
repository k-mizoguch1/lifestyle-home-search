"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("ログインに失敗しました。");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("http://localhost:3001");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-800">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">ログイン</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-blue-900">メールアドレス or たぐっとID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-blue-900">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-purple-800 transition-all"
          >
            ログイン
          </button>
        </form>

        {/* 仕切り線 */}
        <div className="mt-6 border-t border-gray-300"></div>

        {/* パスワードリセット */}
        <div className="mt-4 text-center">
          <a href="/reset-password" className="text-blue-900 hover:underline">
            パスワードを忘れた方はこちら
          </a>
        </div>

        {/* 新規入会 */}
        <div className="mt-2 text-center">
                <a href="/new-application" className="text-blue-900 hover:underline">
                    初めてご利用の方（アカウント作成）
                </a>
        </div>

        {/* 問い合わせ */}
        <div className="mt-2 text-center">
          <a href="/contact-support" className="text-blue-900 hover:underline">
            その他ログインに関する問い合わせ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
