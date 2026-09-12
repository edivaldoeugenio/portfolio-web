export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/db'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { HomeClient } from './_components/home-client'

export default async function HomePage() {
  const [products, configs] = await Promise.all([
    prisma.product.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.siteConfig.findMany(),
  ])

  const configMap: Record<string, string> = {}
  for (const c of configs ?? []) {
    configMap[c?.key ?? ''] = c?.value ?? ''
  }

  const serialized = (products ?? []).map((p: any) => ({
    ...p,
    price: Number(p?.price ?? 0),
    createdAt: p?.createdAt?.toISOString?.() ?? '',
    updatedAt: p?.updatedAt?.toISOString?.() ?? '',
  }))

  return (
    <>
      <Header />
      <HomeClient products={serialized} config={configMap} />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
