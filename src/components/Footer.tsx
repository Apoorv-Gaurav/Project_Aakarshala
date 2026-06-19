import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Camera, Briefcase, Pin, Brush, ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-20 mt-24">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Brand & Socials */}
        <div className="lg:col-span-3 space-y-6">
          <Link href="/" className="relative h-16 w-48 md:h-20 md:w-56 block max-w-full">
            <Image
              src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781896703/logo_3_wagrg6.png"
              alt="Aakarshala Logo"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-neutral-400 max-w-xs leading-relaxed text-sm">
            Premium architecture and interior design studio crafting timeless spaces that inspire and elevate human experience.
          </p>
          <div className="flex space-x-4 pt-2">
            <Link href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all"><Camera size={18} /></Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all"><Briefcase size={18} /></Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all"><Pin size={18} /></Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all"><Brush size={18} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 lg:col-start-5">
          <h3 className="text-lg font-semibold mb-6">Navigation</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-neutral-400 hover:text-white transition-colors text-sm">Home</Link></li>
            <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">Our Story</Link></li>
            <li><Link href="/projects" className="text-neutral-400 hover:text-white transition-colors text-sm">Portfolio</Link></li>
            <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center group">Book Consultation <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Expertise</h3>
          <ul className="space-y-4">
            <li><Link href="/services#architecture" className="text-neutral-400 hover:text-white transition-colors text-sm">Architecture</Link></li>
            <li><Link href="/services#interior" className="text-neutral-400 hover:text-white transition-colors text-sm">Interior Design</Link></li>
            <li><Link href="/services#landscape" className="text-neutral-400 hover:text-white transition-colors text-sm">Landscape</Link></li>
            <li><Link href="/services#renovation" className="text-neutral-400 hover:text-white transition-colors text-sm">Renovation</Link></li>
          </ul>
        </div>

        {/* Compact Location Card */}
        <div className="lg:col-span-4 lg:col-start-9 bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-4 font-semibold">Visit Our Studio</h3>
          
          <div className="flex gap-4 mb-5">
            <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0">
              <Image src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg" alt="Office" fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-2">Shop No. 9,<br/>Scorpio Club, Kursi Road,<br/>Lucknow, UP 226021</p>
              <a href="tel:+919451177570" className="text-accent text-sm font-medium hover:text-white transition-colors">+91 94511 77570</a>
            </div>
          </div>

          <Link 
            href="https://maps.app.goo.gl/kciadBWFGEhAwTFt7"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-24 relative rounded-lg overflow-hidden group mb-4 border border-neutral-800"
          >
            <Image
              src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781900216/location_1_vl0qcf.jpg"
              alt="Aakarshala Map"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </Link>

          <Link 
            href="https://maps.app.goo.gl/kciadBWFGEhAwTFt7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Open in Google Maps
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm gap-4">
        <p>&copy; {new Date().getFullYear()} Aakarshala Studio. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
