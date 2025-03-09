import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // リクエストボディを取得
    const { username, password } = await req.json();

    // 簡単なバリデーション（実際はデータベースと照合）
    if (!username || !password) {
      return NextResponse.json(
        { message: "ユーザー名またはパスワードが未入力です。" },
        { status: 400 }
      );
    }

    // ここでバックエンドの認証APIを呼び出す
    const backendUrl = process.env.BACKEND_API_ENDPOINT + "/auth/login";
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "認証に失敗しました。" },
        { status: 401 }
      );
    }

    // 認証成功時のデータを取得
    const data = await response.json();

    // クライアントにトークンを返す（セキュアな処理が必要）
    return NextResponse.json(
      { token: data.token, message: "ログイン成功" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。"+`${error}` },
      { status: 500 }
    );
  }
}
