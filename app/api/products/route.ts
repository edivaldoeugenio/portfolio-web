export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { getPublicCatalogData } from '@/lib/public-catalog'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const all = searchParams.get('all')

    const { products, source, reason } = await getPublicCatalogData(Boolean(all))

    let filtered = [...products]

    if (category) filtered = filtered.filter((p) => p.category === category)
    if (featured === 'true') filtered = filtered.filter((p) => p.featured)
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q))
    }

    return NextResponse.json(filtered, {
      headers: {
        'x-data-source': source,
        ...(reason ? { 'x-fallback-reason': reason } : {}),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const body = await req.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category,
        size: body.size ?? '',
        stock: Number(body.stock) || 0,
        price: Number(body.price) || 0,
        description: body.description ?? '',
        imageUrl: body.imageUrl ?? null,
        cloudStoragePath: body.cloudStoragePath ?? null,
        isPublicImage: body.isPublicImage ?? false,
        featured: body.featured ?? false,
        active: body.active ?? true,
        sortOrder: Number(body.sortOrder) || 0,
      },
    })
    return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 })
  }
}
