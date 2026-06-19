import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 mt-20">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="text-3xl font-bold tracking-tighter uppercase">
            Aakarshala
          </Link>
          <p className="text-background/80 max-w-xs">
            Premium architecture and interior design studio crafting timeless spaces that inspire and elevate human experience.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-accent transition-colors"><Linkedin size={20} /></Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-background/80 hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="/projects" className="text-background/80 hover:text-accent transition-colors">Projects</Link></li>
            <li><Link href="/services" className="text-background/80 hover:text-accent transition-colors">Services</Link></li>
            <li><Link href="/consultation" className="text-background/80 hover:text-accent transition-colors">Book Consultation</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-background/80">
              <MapPin size={20} className="mt-1 flex-shrink-0" />
              <span>123 Design Avenue,<br />Creative District,<br />New Delhi, 110001</span>
            </li>
            <li className="flex items-center space-x-3 text-background/80">
              <Phone size={20} />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-3 text-background/80">
              <Mail size={20} />
              <span>hello@aakarshala.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-6">Location</h3>
          <div className="bg-background/10 rounded-lg overflow-hidden h-32 mb-4 relative">
            {/* Embedded Mini Map Preview Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin size={32} className="text-background/50" />
            </div>
          </div>
          <Link 
            href="/contact" 
            className="inline-block border border-background/20 rounded px-6 py-2 hover:bg-background hover:text-foreground transition-all duration-300"
          >
            View on Map
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-background/10 text-center text-background/50 text-sm">
        &copy; {new Date().getFullYear()} Aakarshala Studio. All rights reserved.
      </div>
    </footer>
  )
}
