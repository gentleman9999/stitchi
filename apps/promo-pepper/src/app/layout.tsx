import { PrimaryNavigation } from '@/components/common'
import { Inter } from 'next/font/google'
// import SubscribeBanner from './SubsribeBanner'
import Footer from './Footer'

import './main.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'PromoPepper',
  description: 'PromoPepper promotional products directory and newsletter.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/msx0isz.css" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {/* <SubscribeBanner /> */}
        <PrimaryNavigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
