import React from "react";
import Login from "../../components/Login/index"; // index.tsxのLoginコンポーネントをインポート

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Login />
    </div>
  );
};

export default Page;