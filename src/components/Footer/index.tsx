import React from 'react';

export const Footer: React.FC = () => {
  const links = [
    'アプリ概要',
    '採用情報',
    'お問い合わせ',
    'プライバシーポリシー',
  ];

  return (
    <footer className="bg-blue-900 text-white py-6 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-xl font-bold">たぐっとホーム</p>
        <nav className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0 text-xs">
          {links.map((link, index) => (
            <a key={index} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
