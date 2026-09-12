'use client'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/product-card'
import { Search, ShoppingBag, MessageCircle, ArrowRight, Sparkles, Phone, CheckCircle } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  size: string
  stock: number
  price: number
  description: string
  imageUrl: string | null
  featured: boolean
}

interface HomeClientProps {
  products: Product[]
  config: Record<string, string>
}

const CATEGORIES = [
  { name: 'Colchas e Cobre-leitos', icon: '🛏️', desc: 'Proteção e beleza para sua cama' },
  { name: 'Colchas e Jogos de Cama', icon: '✨', desc: 'Conjuntos completos de qualidade' },
  { name: 'Tapetes e Passadeiras', icon: '🏠', desc: 'Conforto e estilo para seus pisos' },
]

export function HomeClient({ products, config }: HomeClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const whatsapp = '5567998319272'
  const bannerTitle = config?.banner_title ?? 'Casa & Conforto para o seu lar'
  const bannerSub = config?.banner_subtitle ?? 'Colchas, jogos de cama, tapetes e passadeiras com qualidade e carinho.'
  const aboutText = config?.about_text ?? ''

  const featured = useMemo(
    () => (products ?? []).filter((p: Product) => p?.featured),
    [products]
  )

  const filtered = useMemo(() => {
    let list = products ?? []
    if (activeCategory) list = list.filter((p: Product) => p?.category === activeCategory)
    if (search?.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p: Product) => p?.name?.toLowerCase()?.includes(q))
    }
    return list
  }, [products, activeCategory, search])

  const whatsappGeneric = `https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Vim do site da Suzana Casa & Conforto e gostaria de mais informações.')}`

  return (
    <main>
      {/* HERO */}
      <section id="inicio" className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpeg"
            alt="Ambiente acolhedor com cortinas bege"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl font-bold text-white drop-shadow-lg md:text-6xl"
          >
            {bannerTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-white/90 drop-shadow md:text-xl"
          >
            {bannerSub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 rounded-md bg-white/90 px-6 py-3 font-medium text-taupe-darker transition-colors hover:bg-white"
            >
              <ShoppingBag className="h-5 w-5" /> Ver Catálogo
            </a>
            <a
              href={whatsappGeneric}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" /> Fale Conosco
            </a>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="bg-card py-16">
        <div className="container mx-auto max-w-[1200px] px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-serif text-3xl font-semibold text-foreground md:text-4xl"
          >
            Nossas Categorias
          </motion.h2>
          <p className="mt-2 text-center text-muted-foreground">Encontre o que precisa para cada ambiente</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setActiveCategory(cat.name)
                  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group flex flex-col items-center gap-3 rounded-lg bg-background p-8 shadow-[var(--shadow-md)] transition-all hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
              >
                <span className="text-4xl">{cat.icon}</span>
                <h3 className="font-serif text-lg font-semibold text-foreground">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-rosa transition-colors group-hover:text-rosa/80">
                  Ver produtos <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      {(featured?.length ?? 0) > 0 && (
        <section id="destaques" className="py-16">
          <div className="container mx-auto max-w-[1200px] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2"
            >
              <Sparkles className="h-6 w-6 text-rosa" />
              <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">Destaques</h2>
            </motion.div>
            <p className="mt-2 text-center text-muted-foreground">Peças selecionadas especialmente para você</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p: Product) => (
                <ProductCard key={p?.id} product={p} whatsappNumber={whatsapp} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CATÁLOGO */}
      <section id="catalogo" className="bg-card py-16">
        <div className="container mx-auto max-w-[1200px] px-4">
          <h2 className="text-center font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Catálogo Completo
          </h2>
          <p className="mt-2 text-center text-muted-foreground">Explore todos os nossos produtos</p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !activeCategory
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-4 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {(filtered?.length ?? 0) > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p: Product) => (
                <ProductCard key={p?.id} product={p} whatsappNumber={whatsapp} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-muted-foreground">Nenhum produto encontrado.</p>
          )}
        </div>
      </section>

      {/* COMO COMPRAR */}
      <section id="como-comprar" className="py-16">
        <div className="container mx-auto max-w-[1200px] px-4">
          <h2 className="text-center font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Como Comprar
          </h2>
          <p className="mt-2 text-center text-muted-foreground">É simples, rápido e pelo WhatsApp</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { step: '1', title: 'Escolha o produto', desc: 'Navegue pelo catálogo e encontre a peça perfeita para você.', icon: ShoppingBag },
              { step: '2', title: 'Clique em "Tenho interesse"', desc: 'O botão abre uma conversa no WhatsApp com a mensagem já pronta.', icon: MessageCircle },
              { step: '3', title: 'Finalize pelo WhatsApp', desc: 'Combine pagamento, entrega e tire todas as suas dúvidas diretamente.', icon: CheckCircle },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center rounded-lg bg-card p-8 text-center shadow-[var(--shadow-md)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rosa/15 text-rosa">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="mt-4 font-serif text-3xl font-bold text-taupe">{s.step}</span>
                <h3 className="mt-2 font-serif text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="bg-card py-16">
        <div className="container mx-auto max-w-[800px] px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl font-semibold text-foreground md:text-4xl"
          >
            Sobre Nós
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg"
          >
            {aboutText}
          </motion.p>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-16">
        <div className="container mx-auto max-w-[600px] px-4 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">Contato</h2>
          <p className="mt-2 text-muted-foreground">Fale conosco diretamente pelo WhatsApp</p>
          <div className="mt-8 rounded-lg bg-card p-8 shadow-[var(--shadow-md)]">
            <Phone className="mx-auto h-10 w-10 text-rosa" />
            <p className="mt-4 font-serif text-xl font-semibold text-foreground">WhatsApp</p>
            <p className="mt-1 text-muted-foreground" suppressHydrationWarning>
              +{whatsapp?.replace?.(/(\d{2})(\d{2})(\d{5})(\d{4})/, '$1 ($2) $3-$4') ?? whatsapp}
            </p>
            <a
              href={whatsappGeneric}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-green-500 px-6 py-3 font-medium text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" /> Enviar Mensagem
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}