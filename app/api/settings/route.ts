export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { getPublicCatalogData } from '@/lib/public-catalog'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    const { config, source, reason } = await getPublicCatalogData()

    if (key) {
      return NextResponse.json(
        { key, value: config[key] ?? '' },
        {
          headers: {
            'x-data-source': source,
            ...(reason ? { 'x-fallback-reason': reason } : {}),
          },
        }
      )
    }

    const configs = Object.entries(config).map(([cfgKey, value]) => ({ key: cfgKey, value }))

    return NextResponse.json(configs, {
      headers: {
        'x-data-source': source,
        ...(reason ? { 'x-fallback-reason': reason } : {}),
      },
    })
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
