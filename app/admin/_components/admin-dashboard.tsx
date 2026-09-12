'use client'
import { useState, useEffect, useCallback } from 'react'
import { signOut } from 'next-auth/react'
import { Plus, Pencil, Trash2, LogOut, Settings, Package, AlertTriangle, Save, Upload, X } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  category: string
  size: string
  stock: number
  price: number
  description: string
  imageUrl: string | null
  cloudStoragePath: string | null
  isPublicImage: boolean
  featured: boolean
  active: boolean
  sortOrder: number
}

const CATEGORIES = ['Colchas e Cobre-leitos', 'Colchas e Jogos de Cama', 'Tapetes e Passadeiras']

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  category: CATEGORIES[0],
  size: '',
  stock: 0,
  price: 0,
  description: '',
  imageUrl: null,
  cloudStoragePath: null,
  isPublicImage: false,
  featured: false,
  active: true,
  sortOrder: 0,
}

export function AdminDashboard({ userEmail }: { userEmail: string }) {
  const [tab, setTab] = useState<'products' | 'settings'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<any>({ ...emptyProduct })
  const [whatsapp, setWhatsapp] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const loadProducts = useCallback(async () => {
    try {
      const r = await fetch('/api/products?all=true')
      const d = await r.json()
      setProducts(Array.isArray(d) ? d : [])
    } catch { setProducts([]) }
  }, [])

  const loadSettings = useCallback(async () => {
    try {
      const r = await fetch('/api/settings?key=whatsapp_number')
      const d = await r.json()
      setWhatsapp(d?.value ?? '5567998319272')
    } catch {}
  }, [])

  useEffect(() => {
    loadProducts()
    loadSettings()
  }, [loadProducts, loadSettings])

  const showMsg = (m: string) => {
    setMessage(m)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return
    setUploading(true)
    try {
      const res = await fetch('/api/upload/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentType: file.type }),
      })
      const { uploadUrl, cloud_storage_path } = await res.json()
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      // Build public URL
      const bucketName = cloud_storage_path?.includes('public/uploads') ? true : false
      const region = 'us-west-2'
      const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
      // Use API to get URL
      const publicUrl = `https://i.ytimg.com/vi/mUL0ABssVKo/maxresdefault.jpg ?? 'storage'}.s3.${region}.amazonaws.com/${cloud_storage_path?.split('/').map(encodeURIComponent).join('/')}`
      setForm((prev: any) => ({
        ...prev,
        imageUrl: publicUrl,
        cloudStoragePath: cloud_storage_path,
        isPublicImage: true,
      }))
      showMsg('Imagem enviada!')
    } catch {
      showMsg('Erro ao enviar imagem')
    } finally {
      setUploading(false)
    }
  }

  const saveProduct = async () => {
    setSaving(true)
    try {
      const url = editing ? `/api/products/${editing.id}` : '/api/products'
      const method = editing ? 'PUT' : 'POST'
      const r = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (r.ok) {
        showMsg(editing ? 'Produto atualizado!' : 'Produto criado!')
        setEditing(null)
        setCreating(false)
        setForm({ ...emptyProduct })
        loadProducts()
      } else {
        showMsg('Erro ao salvar')
      }
    } catch {
      showMsg('Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este produto?')) return
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      showMsg('Produto removido')
      loadProducts()
    } catch {
      showMsg('Erro ao remover')
    }
  }

  const saveWhatsapp = async () => {
    setSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'whatsapp_number', value: whatsapp }),
      })
      showMsg('Número salvo!')
    } catch {
      showMsg('Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (p: Product) => {
    setEditing(p)
    setCreating(false)
    setForm({ ...p })
  }

  const startCreate = () => {
    setCreating(true)
    setEditing(null)
    setForm({ ...emptyProduct })
  }

  const cancelForm = () => {
    setEditing(null)
    setCreating(false)
    setForm({ ...emptyProduct })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
          <h1 className="font-serif text-xl font-semibold text-foreground">
            Painel Administrativo
          </h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground md:block">{userEmail}</span>
            <button
              onClick={() => signOut({ redirectTo: '/' })}
              className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground hover:bg-secondary/80"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="mx-auto max-w-[1200px] px-4 pt-3">
          <div className="rounded-md bg-green-100 px-4 py-2 text-sm text-green-800">{message}</div>
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-border pb-3">
          <button
            onClick={() => setTab('products')}
            className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'products' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Package className="h-4 w-4" /> Produtos
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'settings' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Settings className="h-4 w-4" /> Configurações
          </button>
        </div>

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">{(products?.length ?? 0)} produtos</h2>
              <button
                onClick={startCreate}
                className="inline-flex items-center gap-1.5 rounded-md bg-rosa px-4 py-2 text-sm font-medium text-white hover:bg-rosa/90"
              >
                <Plus className="h-4 w-4" /> Novo Produto
              </button>
            </div>

            {/* Form */}
            {(editing || creating) && (
              <div className="mt-6 rounded-lg border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold">
                    {editing ? 'Editar Produto' : 'Novo Produto'}
                  </h3>
                  <button onClick={cancelForm} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Nome</label>
                    <input
                      value={form?.name ?? ''}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Categoria</label>
                    <select
                      value={form?.category ?? ''}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Tamanho</label>
                    <input
                      value={form?.size ?? ''}
                      onChange={(e) => setForm({ ...form, size: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Estoque</label>
                    <input
                      type="number"
                      value={form?.stock ?? 0}
                      onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Preço (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form?.price ?? 0}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Ordem</label>
                    <input
                      type="number"
                      value={form?.sortOrder ?? 0}
                      onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium">Descrição</label>
                    <textarea
                      value={form?.description ?? ''}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium">Imagem</label>
                    <div className="flex items-center gap-4">
                      {form?.imageUrl && (
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="80px" />
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          value={form?.imageUrl ?? ''}
                          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                          placeholder="URL da imagem ou faça upload"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        />
                        <label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80">
                          <Upload className="h-3.5 w-3.5" />
                          {uploading ? 'Enviando...' : 'Upload de imagem'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0]
                              if (f) handleImageUpload(f)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form?.featured ?? false}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="rounded"
                      />
                      Destaque
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form?.active ?? true}
                        onChange={(e) => setForm({ ...form, active: e.target.checked })}
                        className="rounded"
                      />
                      Ativo
                    </label>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={saveProduct}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" /> {saving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={cancelForm}
                    className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground hover:bg-secondary/80"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Product list */}
            <div className="mt-6 space-y-3">
              {(products ?? []).map((p: Product) => (
                <div
                  key={p?.id}
                  className={`flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors ${
                    !p?.active ? 'opacity-50' : ''
                  }`}
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                    {p?.imageUrl ? (
                      <Image src={p.imageUrl} alt={p?.name ?? ''} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">—</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate font-medium text-foreground">{p?.name ?? ''}</h4>
                      {p?.featured && (
                        <span className="shrink-0 rounded-sm bg-rosa/20 px-1.5 py-0.5 text-xs text-rosa">Destaque</span>
                      )}
                      {!p?.active && (
                        <span className="shrink-0 rounded-sm bg-red-100 px-1.5 py-0.5 text-xs text-red-700">Inativo</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {p?.category ?? ''} &middot; {p?.size ?? ''} &middot; {p?.stock ?? 0} un. &middot;{' '}
                      {(p?.price ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p?.id)}
                      className="rounded-md p-2 text-muted-foreground hover:bg-red-100 hover:text-red-600"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === 'settings' && (
          <div className="mt-6 max-w-lg">
            <h2 className="font-serif text-xl font-semibold">Configurações do Site</h2>
            <div className="mt-6 rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-3 rounded-md bg-amber-50 p-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Número de WhatsApp é placeholder</p>
                  <p className="text-xs text-amber-700">
                    O número atual (5567998319272) é demonstrativo. Troque pelo seu número real para receber mensagens dos clientes.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium">Número do WhatsApp (somente números, com DDI+DDD)</label>
                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                  placeholder="5567998319272"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                onClick={saveWhatsapp}
                disabled={saving}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {saving ? 'Salvando...' : 'Salvar Número'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
