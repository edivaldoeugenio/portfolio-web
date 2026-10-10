export const dynamic = 'force-dynamic'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { HomeClient } from './_components/home-client'
import { getPublicCatalogData } from '@/lib/public-catalog'

export default async function HomePage() {
  const { products, config } = await getPublicCatalogData()

  return (
    <>
      <Header />
      <HomeClient products={products} config={config} />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
