import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hidden test account
  const testHash = await bcrypt.hash('ICV82h@fR4', 12)
  await prisma.user.upsert({
    where: { email: 'abacus-c69b35f5@example.com' },
    update: {},
    create: {
      email: 'abacus-c69b35f5@example.com',
      password: testHash,
      name: 'Test Admin',
      role: 'admin',
    },
  })

  // User-requested admin account
  const adminHash = await bcrypt.hash('suzana2026', 12)
  await prisma.user.upsert({
    where: { email: 'admin@suzanacasa.com' },
    update: {},
    create: {
      email: 'admin@suzanacasa.com',
      password: adminHash,
      name: 'Suzana Admin',
      role: 'admin',
    },
  })

  // Site configs
  const configs = [
    { key: 'whatsapp_number', value: '5567998319272' },
    { key: 'banner_title', value: 'Casa & Conforto para o seu lar' },
    { key: 'banner_subtitle', value: 'Colchas, jogos de cama, tapetes e passadeiras com qualidade e carinho para transformar cada c\u00f4modo da sua casa.' },
    { key: 'about_text', value: 'A Suzana Casa & Conforto nasceu do amor por transformar ambientes em espa\u00e7os acolhedores. Trabalhamos com pe\u00e7as selecionadas de cama, mesa e banho, sempre priorizando qualidade, beleza e pre\u00e7o justo. Cada produto \u00e9 escolhido a dedo para levar mais conforto e eleg\u00e2ncia ao seu lar. Atendemos com carinho e dedica\u00e7\u00e3o pelo WhatsApp, garantindo uma experi\u00eancia personalizada para voc\u00ea.' },
  ]
  for (const c of configs) {
    await prisma.siteConfig.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: c,
    })
  }

  // Products
  const products = [
    {
      name: 'Colcha Rosa Matelass\u00ea',
      category: 'Colchas e Jogos de Cama',
      size: 'Casal',
      stock: 2,
      price: 280.0,
      description: 'Colcha matelass\u00ea macia e elegante, ideal para deixar o quarto mais aconchegante e delicado.',
      imageUrl: '/images/products/colcha-rosa-matelasse.jpeg',
      featured: true,
      active: true,
      sortOrder: 1,
    },
    {
      name: 'Colcha Rosa Listrada',
      category: 'Colchas e Cobre-leitos',
      size: 'Solteiro',
      stock: 4,
      price: 150.0,
      description: 'Colcha listrada macia rosa e branca, perfeita para um quarto feminino e delicado.',
      imageUrl: '/images/products/colcha-rosa-listrada.jpeg',
      featured: false,
      active: true,
      sortOrder: 2,
    },
    {
      name: 'Colcha Verde Bordada Queen',
      category: 'Colchas e Jogos de Cama',
      size: 'Queen',
      stock: 2,
      price: 260.0,
      description: 'Conjunto 3 pe\u00e7as com bordado, 3200 fios, ultra suave.',
      imageUrl: '/images/products/colcha-verde-bordada.jpeg',
      featured: true,
      active: true,
      sortOrder: 3,
    },
    {
      name: 'Jogo de Cama Azul 2500 Fios',
      category: 'Colchas e Jogos de Cama',
      size: 'Casal',
      stock: 5,
      price: 220.0,
      description: 'Len\u00e7ol estilo americano com bordado, maciez premium.',
      imageUrl: '/images/products/jogo-cama-azul.jpeg',
      featured: false,
      active: true,
      sortOrder: 4,
    },
    {
      name: 'Colcha Cinza Bordada',
      category: 'Colchas e Cobre-leitos',
      size: 'Casal',
      stock: 3,
      price: 240.0,
      description: 'Bordado em tom prateado, sofisticada e vers\u00e1til.',
      imageUrl: '/images/products/colcha-cinza-bordada.jpeg',
      featured: false,
      active: true,
      sortOrder: 5,
    },
    {
      name: 'Tapete Caf\u00e9',
      category: 'Tapetes e Passadeiras',
      size: '1,20 m x 0,60 m',
      stock: 6,
      price: 85.0,
      description: 'Estampa tem\u00e1tica de caf\u00e9, ideal para cozinhas.',
      imageUrl: '/images/products/tapete-cafe.jpeg',
      featured: true,
      active: true,
      sortOrder: 6,
    },
    {
      name: 'Passadeira Caf\u00e9 Xadrez',
      category: 'Tapetes e Passadeiras',
      size: '0,90 m x 0,50 m',
      stock: 8,
      price: 75.0,
      description: 'Xadrez com gr\u00e3os de caf\u00e9, combina com cozinhas r\u00fasticas.',
      imageUrl: '/images/products/passadeira-cafe-xadrez.jpeg',
      featured: false,
      active: true,
      sortOrder: 7,
    },
    {
      name: 'Passadeira Taupe',
      category: 'Tapetes e Passadeiras',
      size: '1,50 m x 0,60 m',
      stock: 5,
      price: 95.0,
      description: 'Tons neutros que combinam com qualquer ambiente.',
      imageUrl: '/images/products/passadeira-taupe.jpeg',
      featured: false,
      active: true,
      sortOrder: 8,
    },
    {
      name: 'Colcha Listrada Colorida',
      category: 'Colchas e Cobre-leitos',
      size: 'Casal',
      stock: 3,
      price: 190.0,
      description: 'Colcha canelada em tons de rosa, vermelho e branco, super macia e vibrante.',
      imageUrl: '/images/products/colcha-listrada-colorida.jpeg',
      featured: false,
      active: true,
      sortOrder: 9,
    },
    {
      name: 'Passadeira Geom\u00e9trica Bege',
      category: 'Tapetes e Passadeiras',
      size: '1,50 m x 0,60 m',
      stock: 4,
      price: 90.0,
      description: 'Padr\u00e3o geom\u00e9trico discreto em tons bege, ideal para quartos.',
      imageUrl: '/images/products/passadeira-geometrica-bege.jpeg',
      featured: false,
      active: true,
      sortOrder: 10,
    },
    {
      name: 'Tapete Quarto Bege',
      category: 'Tapetes e Passadeiras',
      size: '1,20 m x 0,60 m',
      stock: 6,
      price: 80.0,
      description: 'Tapete macio em bege neutro, perfeito ao lado da cama.',
      imageUrl: '/images/products/tapete-quarto-bege.jpeg',
      featured: false,
      active: true,
      sortOrder: 11,
    },
    {
      name: 'Passadeira Moderna Taupe',
      category: 'Tapetes e Passadeiras',
      size: '1,50 m x 0,50 m',
      stock: 5,
      price: 88.0,
      description: 'Design moderno em tons taupe, vers\u00e1til para corredores e quartos.',
      imageUrl: '/images/products/passadeira-moderna-taupe.jpeg',
      featured: false,
      active: true,
      sortOrder: 12,
    },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') },
      update: {},
      create: {
        id: p.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
        ...p,
      },
    })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
