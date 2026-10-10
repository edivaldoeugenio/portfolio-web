import { fallbackCatalogConfig, fallbackCatalogProducts, PublicProduct } from '@/lib/fallback-catalog'
import { isDatabaseUnavailableError, prisma, withTimeout } from '@/lib/db'

type PublicCatalogData = {
  products: PublicProduct[]
  config: Record<string, string>
  source: 'database' | 'fallback'
  reason?: string
}

const DB_QUERY_TIMEOUT_MS = Number(process.env.DB_QUERY_TIMEOUT_MS ?? 3000)

function normalizeProducts(products: any[]): PublicProduct[] {
  return (products ?? []).map((p: any) => ({
    id: p?.id,
    name: p?.name,
    category: p?.category,
    size: p?.size ?? '',
    stock: Number(p?.stock ?? 0),
    price: Number(p?.price ?? 0),
    description: p?.description ?? '',
    imageUrl: p?.imageUrl ?? null,
    featured: Boolean(p?.featured),
    active: Boolean(p?.active ?? true),
    sortOrder: Number(p?.sortOrder ?? 0),
    createdAt: p?.createdAt?.toISOString?.() ?? '',
    updatedAt: p?.updatedAt?.toISOString?.() ?? '',
  }))
}

function normalizeConfig(configs: any[]): Record<string, string> {
  const configMap: Record<string, string> = {}

  for (const c of configs ?? []) {
    const key = c?.key ?? ''
    if (key) {
      configMap[key] = c?.value ?? ''
    }
  }

  return configMap
}

function getFallbackData(reason: string): PublicCatalogData {
  return {
    products: [...fallbackCatalogProducts],
    config: { ...fallbackCatalogConfig },
    source: 'fallback',
    reason,
  }
}

export async function getPublicCatalogData(includeInactive = false): Promise<PublicCatalogData> {
  try {
    const [products, configs] = await Promise.all([
      withTimeout(
        prisma.product.findMany({
          where: includeInactive ? undefined : { active: true },
          orderBy: { sortOrder: 'asc' },
        }),
        DB_QUERY_TIMEOUT_MS,
        `Tempo limite ao consultar produtos (${DB_QUERY_TIMEOUT_MS}ms)`
      ),
      withTimeout(
        prisma.siteConfig.findMany(),
        DB_QUERY_TIMEOUT_MS,
        `Tempo limite ao consultar configurações (${DB_QUERY_TIMEOUT_MS}ms)`
      ),
    ])

    return {
      products: normalizeProducts(products),
      config: normalizeConfig(configs),
      source: 'database',
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    const unavailable = isDatabaseUnavailableError(error) || /tempo limite/i.test(message)
    const reason = unavailable ? 'database_unavailable' : 'database_query_error'

    console.warn('[catalog] Falha ao carregar dados do banco. Usando fallback local.', {
      reason,
      details: message,
    })

    return getFallbackData(reason)
  }
}
