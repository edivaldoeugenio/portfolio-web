export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { generatePresignedUploadUrl } from '@/lib/s3'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const { fileName, contentType } = await req.json()
    if (!fileName) {
      return NextResponse.json({ error: 'fileName obrigatório' }, { status: 400 })
    }
    const result = await generatePresignedUploadUrl(
      fileName,
      contentType ?? 'image/jpeg',
      true // product images are public
    )
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao gerar URL' }, { status: 500 })
  }
}
