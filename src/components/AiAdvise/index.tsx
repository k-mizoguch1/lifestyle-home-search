// import ReactMarkdown from 'react-markdown'
// type Props = {
//   aiResponse: string
// }
// export function AiAdvise({ aiResponse }: Props) {
//   return (
//     <div className="mt-4 whitespace-pre-line text-black py-10 px-20 rounded-3xl bg-[#FFE492]">
//       <p className="py-6 text-2xl font-bold">この物件での生活は...</p>
//       <ReactMarkdown>{aiResponse}</ReactMarkdown>
//     </div>
//   )
// }
// import { useState } from "react";

// import ReactMarkdown from "react-markdown";

// type AiResponse = {
//   summary: string;
//   advantages: string[];
//   disadvantages: string[];
//   suitable_for: string;
// };

// type Props = {
//   aiResponse: AiResponse | null;
// };

// export function AiAdvise({ aiResponse }: Props) {
//   if (!aiResponse) return <p>データを取得中...</p>;
//   // JSONデータをMarkdownのフォーマットに変換
//   const markdownContent = `
// ## 🏡 物件のライフスタイルについて

// **概要**  
// ${aiResponse.summary}

// ### ✅ メリット
// ${aiResponse.advantages.map((adv) => `- ${adv}`).join("\n")}

// ### ❌ デメリット
// ${aiResponse.disadvantages.map((dis) => `- ${dis}`).join("\n")}

// ### 🎯 こんな人におすすめ
// ${aiResponse.suitable_for}
//   `;

//   return (
//     <div className="mt-4 whitespace-pre-line text-black py-10 px-20 rounded-3xl bg-[#FFE492]">
//       <p className="py-6 text-2xl font-bold">この物件での生活は...</p>
//       <ReactMarkdown>{markdownContent}</ReactMarkdown>
//     </div>
//   );
// }


import ReactMarkdown from "react-markdown";

type AiResponse = {
  summary: string;
  advantages: string[];
  disadvantages: string[];
  suitable_for: string;
};

type Props = {
  aiResponse: AiResponse | null;
};

export function AiAdvise({ aiResponse }: Props) {
  if (!aiResponse) return <p className="text-center text-gray-500">データを取得中...</p>;

  // JSONデータをMarkdownのフォーマットに変換
  const markdownContent = `
${aiResponse.summary}

### ✅ メリット
${aiResponse.advantages.map((adv) => `- ${adv}`).join("\n")}

### ❌ デメリット
${aiResponse.disadvantages.map((dis) => `- ${dis}`).join("\n")}

### 🎯 こんな人におすすめ
${aiResponse.suitable_for}
  `;

  return (
    <div className="mt-6 text-gray-800 py-8 px-12 rounded-3xl bg-yellow-100 shadow-lg">
       <p className="py-6 text-2xl font-bold">🏡 この物件での生活は...</p>
      <ReactMarkdown
        components={{
          // h2: ({ children }) => <h2 className="text-3xl font-bold mb-4 text-gray-900">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">{children}</h3>,
          strong: ({ children }) => <strong className="text-lg font-bold">{children}</strong>,
          ul: ({ children }) => <ul className="pl-6 list-disc">{children}</ul>,
          li: ({ children }) => <li className="text-lg">{children}</li>,
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}

