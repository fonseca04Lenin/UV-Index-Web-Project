import type { Metadata, Viewport } from 'next'
import { Silkscreen } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeByTime } from '@/components/theme-by-time'
import './globals.css'

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
})

export const metadata: Metadata = {
  title: 'UV Forecast - Pixel Weather',
  description: 'A pixel art 7-day UV index forecast to help you plan your time outdoors safely.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#87ceeb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={silkscreen.variable}>
      <body className="font-sans">
        <ThemeByTime />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
