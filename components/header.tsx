'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Categorias', href: '/#categorias' },
  { label: 'Destaques', href: '/#destaques' },
  { label: 'Catálogo', href: '/#catalogo' },
  { label: 'Como Comprar', href: '/#como-comprar' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-cream/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-taupe-darker md:text-2xl">
          Suzana <span className="text-rosa">Casa</span> & Conforto
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border/40 bg-cream px-4 pb-4 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
