'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Consultation', href: '/consultation' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change — handled by onClick on links already
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out',
        scrolled
          ? 'bg-background/90 backdrop-blur-lg border-b border-border/50 py-3 shadow-sm'
          : 'bg-transparent py-5 md:py-8'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="z-50 relative h-10 w-36 md:h-12 md:w-48 block shrink-0">
          <Image
            src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781896288/logo_5_llvtzy.png"
            alt="Aakarshala Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm lg:text-base font-medium tracking-wide transition-colors duration-300 relative group py-2',
                pathname === link.href
                  ? 'text-accent'
                  : 'text-foreground/90 hover:text-accent'
              )}
            >
              {link.name}
              <span
                className={cn(
                  'absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-right transition-transform duration-500 ease-out',
                  pathname === link.href
                    ? 'scale-x-100 origin-left'
                    : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 w-full h-full bg-background z-40 flex flex-col items-center justify-center"
            >
              <nav className="flex flex-col items-center space-y-8">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'text-3xl font-medium tracking-wide transition-colors duration-300',
                        pathname === link.href ? 'text-accent' : 'hover:text-accent'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
