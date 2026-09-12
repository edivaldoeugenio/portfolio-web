import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-taupe-darker/10 py-8">
      <div className="container mx-auto max-w-[1200px] px-4 text-center">
        <p className="font-serif text-lg font-semibold text-taupe-darker">
          Suzana <span className="text-rosa">Casa</span> & Conforto
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/#catalogo" className="hover:text-foreground transition-colors">Catálogo</Link>
          <Link href="/#sobre" className="hover:text-foreground transition-colors">Sobre</Link>
          <Link href="/#contato" className="hover:text-foreground transition-colors">Contato</Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground" suppressHydrationWarning>
          &copy; 2026 Suzana Casa & Conforto. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
