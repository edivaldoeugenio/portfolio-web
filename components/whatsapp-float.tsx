'use client'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

export function WhatsAppFloat() {
  const [number, setNumber] = useState('5567998319272')


  const msg = encodeURIComponent('Olá! Vim do site da Suzana Casa & Conforto e gostaria de mais informações.')
  return (
    <a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
