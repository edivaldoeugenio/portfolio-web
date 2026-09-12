export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const all = searchParams.get('all') // admin mode - include inactive

    const where: any = {}
    if (!all) where.active = true
    if (category) where.category = category
    if (featured === 'true') where.featured = true
    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(products)
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
