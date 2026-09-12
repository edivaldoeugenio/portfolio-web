import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { SessionProvider } from 'next-auth/react'

export const dynamic = 'force-dynamic'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Suzana Casa & Conforto | Cama, Mesa e Banho',
  description: 'Colchas, jogos de cama, tapetes e passadeiras com qualidade e carinho para transformar cada cômodo da sua casa.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Suzana Casa & Conforto',
    description: 'Colchas, jogos de cama, tapetes e passadeiras para o seu lar.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} font-sans`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <ChunkLoadErrorHandler />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
