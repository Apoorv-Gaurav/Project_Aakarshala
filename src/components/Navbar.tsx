'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Consultation', href: '/consultation' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out',
        scrolled ? 'bg-background/90 backdrop-blur-lg border-b border-border/50 py-3 shadow-sm' : 'bg-transparent py-8'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="z-50 relative h-12 w-48 block">
          <Image
            src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781896288/logo_5_llvtzy.png"
            alt="Aakarshala Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium tracking-wide text-foreground/90 hover:text-accent transition-colors duration-300 relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center space-y-8 z-40"
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-medium tracking-wide hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
