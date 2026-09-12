export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const { id } = await params
    const body = await req.json()
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        size: body.size,
        stock: Number(body.stock) || 0,
        price: Number(body.price) || 0,
        description: body.description,
        imageUrl: body.imageUrl,
        cloudStoragePath: body.cloudStoragePath ?? null,
        isPublicImage: body.isPublicImage ?? false,
        featured: body.featured ?? false,
        active: body.active ?? true,
        sortOrder: Number(body.sortOrder) || 0,
      },
    })
    return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const { id } = await params
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao remover produto' }, { status: 500 })
  }
}
