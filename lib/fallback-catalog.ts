export type PublicProduct = {
  id: string
  name: string
  category: string
  size: string
  stock: number
  price: number
  description: string
  imageUrl: string | null
  featured: boolean
  active: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

const fallbackTimestamp = '2026-01-01T00:00:00.000Z'

export const fallbackCatalogProducts: PublicProduct[] = [
  {
    id: 'fallback-colcha-rosa-matelasse',
    name: 'Colcha Rosa Matelassê',
    category: 'Colchas e Cobre-leitos',
    size: 'Casal',
    stock: 8,
    price: 199.9,
    description: 'Colcha com acabamento matelassê e toque macio para o dia a dia.',
    imageUrl: '/images/products/colcha-rosa-matelasse.jpeg',
    featured: true,
    active: true,
    sortOrder: 1,
    createdAt: fallbackTimestamp,
    updatedAt: fallbackTimestamp,
  },
  {
    id: 'fallback-colcha-verde-bordada',
    name: 'Colcha Verde Bordada',
    category: 'Colchas e Cobre-leitos',
    size: 'Queen',
    stock: 6,
    price: 229.9,
    description: 'Peça bordada com visual sofisticado e ótimo caimento.',
    imageUrl: '/images/products/colcha-verde-bordada.jpeg',
    featured: false,
    active: true,
    sortOrder: 2,
    createdAt: fallbackTimestamp,
    updatedAt: fallbackTimestamp,
  },
  {
    id: 'fallback-jogo-cama-azul',
    name: 'Jogo de Cama Azul',
    category: 'Colchas e Jogos de Cama',
    size: 'Queen',
    stock: 10,
    price: 159.9,
    description: 'Jogo de cama completo com tecido confortável e resistente.',
    imageUrl: '/images/products/jogo-cama-azul.jpeg',
    featured: true,
    active: true,
    sortOrder: 3,
    createdAt: fallbackTimestamp,
    updatedAt: fallbackTimestamp,
  },
  {
    id: 'fallback-passadeira-geometrica-bege',
    name: 'Passadeira Geométrica Bege',
    category: 'Tapetes e Passadeiras',
    size: '0,60 x 1,80 m',
    stock: 12,
    price: 129.9,
    description: 'Passadeira neutra com desenho geométrico para corredor e cozinha.',
    imageUrl: '/images/products/passadeira-geometrica-bege.jpeg',
    featured: false,
    active: true,
    sortOrder: 4,
    createdAt: fallbackTimestamp,
    updatedAt: fallbackTimestamp,
  },
  {
    id: 'fallback-tapete-quarto-bege',
    name: 'Tapete Quarto Bege',
    category: 'Tapetes e Passadeiras',
    size: '1,40 x 2,00 m',
    stock: 5,
    price: 249.9,
    description: 'Tapete com textura suave para trazer aconchego ao ambiente.',
    imageUrl: '/images/products/tapete-quarto-bege.jpeg',
    featured: true,
    active: true,
    sortOrder: 5,
    createdAt: fallbackTimestamp,
    updatedAt: fallbackTimestamp,
  },
]

export const fallbackCatalogConfig: Record<string, string> = {
  banner_title: 'Casa & Conforto para o seu lar',
  banner_subtitle: 'Colchas, jogos de cama, tapetes e passadeiras com qualidade e carinho.',
  about_text:
    'A Suzana Casa & Conforto seleciona peças para deixar cada ambiente mais acolhedor, com atendimento próximo e personalizado.',
  whatsapp_number: '5567998319272',
}
