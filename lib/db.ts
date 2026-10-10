import { Prisma, PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

globalForPrisma.prisma = prisma

const CONNECTIVITY_PATTERNS = [
  /can't reach database server/i,
  /connect timed out/i,
  /timed out/i,
  /econnrefused/i,
  /enotfound/i,
  /connection.*closed/i,
]

export function isDatabaseUnavailableError(error: unknown): boolean {
  if (!error) return false

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return ['P1001', 'P1002', 'P1017'].includes(error.code)
  }

  const message = error instanceof Error ? error.message : String(error)
  return CONNECTIVITY_PATTERNS.some((pattern) => pattern.test(message))
}

export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> {
  let timeoutId: NodeJS.Timeout | undefined

  try {
    return await Promise.race<T>([
      promise,
      new Promise<T>((_resolve, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(timeoutMessage))
        }, timeoutMs)
      }),
    ])
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}
