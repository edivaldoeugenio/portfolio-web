'use client'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
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
  whatsappNumber: string
}

export function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const priceFormatted = (product?.price ?? 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  const msg = encodeURIComponent(
    `Olá! Tenho interesse no produto ${product?.name ?? ''} (${product?.size ?? ''}) por ${priceFormatted}.`
  )
  const stockLabel =
    (product?.stock ?? 0) <= 0
      ? 'Indisponível'
      : (product?.stock ?? 0) <= 2
        ? `${product?.stock ?? 0} em estoque`
        : `${product?.stock ?? 0} em estoque`
  const stockColor =
    (product?.stock ?? 0) <= 0
      ? 'bg-red-100 text-red-700'
      : (product?.stock ?? 0) <= 2
        ? 'bg-amber-100 text-amber-700'
        : 'bg-green-100 text-green-700'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-[var(--shadow-md)] transition-shadow hover:shadow-[var(--shadow-lg)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {product?.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product?.name ?? 'Produto'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}
        {product?.featured && (
          <span className="absolute left-3 top-3 rounded-sm bg-rosa px-2 py-0.5 text-xs font-semibold text-white">
            Destaque
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">
            {product?.name ?? 'Produto'}
          </h3>
          <span className={`shrink-0 rounded-sm px-2 py-0.5 text-xs font-medium ${stockColor}`}>
            {stockLabel}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {product?.category ?? ''} &middot; {product?.size ?? ''}
        </p>
        <p className="flex-1 text-sm text-foreground/70">{product?.description ?? ''}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-taupe-darker">{priceFormatted}</span>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Tenho interesse
          </a>
        </div>
      </div>
    </motion.div>
  )
}
