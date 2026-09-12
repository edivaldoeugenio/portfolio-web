export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')
    if (key) {
      const config = await prisma.siteConfig.findUnique({ where: { key } })
      return NextResponse.json(config ?? { key, value: '' })
    }
    const configs = await prisma.siteConfig.findMany()
    return NextResponse.json(configs)
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const body = await req.json()
    const config = await prisma.siteConfig.upsert({
      where: { key: body.key },
      update: { value: body.value },
      create: { key: body.key, value: body.value },
    })
    return NextResponse.json(config)
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
  }
}
