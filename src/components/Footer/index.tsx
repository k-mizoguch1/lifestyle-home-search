import React from 'react'
export const Footer: React.FC = () => {
  const links = [
    'たぐっとホーム',
    '紹介文を記載。',
    'Product',
    'Overview',
    'Pricing',
    'Customer stories',
    'Resources',
    'Blog',
    'Guides & tutorials',
    'Help center',
    'Company',
    'About us',
    'Careers',
    'Media kit',
    'Security',
    'Status',
    '©2021 Whitepace LLC. ',
    'Facebook',
    'Twitter',
    'in',
    'Try It Today',
    'Get started for free.Add your whole team as your needs grow.',
    'Start today →',
    'English',
    'Terms & privacy',
  ]

  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </p>
        <nav className="flex flex-wrap justify-center space-x-4 mt-4 md:mt-0">
          {links.map((link, index) => (
            <a key={index} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
