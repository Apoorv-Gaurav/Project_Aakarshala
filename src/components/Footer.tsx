import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">

        {/* Brand & Socials */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-3 flex flex-col items-center text-center space-y-6">
          <Link href="/" className="relative h-32 w-[280px] md:h-48 md:w-[350px] block">
            <Image
              src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781896703/logo_3_wagrg6.png"
              alt="Aakarshala Logo"
              fill
              sizes="(max-width: 768px) 300px, 400px"
              className="object-contain object-center"
            />
          </Link>
          <p className="text-neutral-400 max-w-xs leading-relaxed text-sm">
            Premium architecture and interior design studio crafting timeless spaces that inspire and elevate human experience.
          </p>
          <div className="flex justify-center space-x-3 pt-2">
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300"><FaInstagram size={16} /></Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300"><FaLinkedin size={16} /></Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300"><FaFacebook size={16} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 lg:col-span-2 lg:col-start-5">
          <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Navigation</h3>
          <ul className="space-y-3 md:space-y-4">
            <li><Link href="/" className="text-neutral-400 hover:text-white transition-colors text-sm">Home</Link></li>
            <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">Our Story</Link></li>
            <li><Link href="/projects" className="text-neutral-400 hover:text-white transition-colors text-sm">Portfolio</Link></li>
            <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center group">Book Consultation <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Expertise</h3>
          <ul className="space-y-3 md:space-y-4">
            <li><Link href="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Architecture</Link></li>
            <li><Link href="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Interior Design</Link></li>
            <li><Link href="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Landscape</Link></li>
            <li><Link href="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm">Renovation</Link></li>
          </ul>
        </div>

        {/* Compact Location Card */}
        <div className="col-span-2 lg:col-span-4 lg:col-start-9 bg-neutral-900/50 border border-neutral-800 p-5 md:p-6 rounded-2xl lg:-mt-6">
          <h3 className="text-xs md:text-sm uppercase tracking-widest text-neutral-500 mb-3 md:mb-4 font-semibold">Visit Our Studio</h3>

          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
            <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-lg overflow-hidden shrink-0">
              <Image src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781894216/banner_1_jc2ru7.jpg" alt="Office" fill sizes="100px" className="object-cover" />
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-1">Shop No. 9,<br />Scorpio Club, Kursi Road,<br />Lucknow, UP 226021</p>
              <a href="tel:+919451177570" className="text-accent text-xs md:text-sm font-medium hover:text-white transition-colors">+91 94511 77570</a>
              <a href="mailto:mailtoaakarshala@gmail.com" className="text-accent text-xs md:text-sm font-medium hover:text-white transition-colors">mailtoaakarshala@gmail.com</a>
            </div>
          </div>

          <Link
            href="https://maps.app.goo.gl/kciadBWFGEhAwTFt7"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-28 md:h-32 relative rounded-lg overflow-hidden group border border-neutral-800"
          >
            <Image
              src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781900216/location_1_vl0qcf.jpg"
              alt="Aakarshala Map"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs md:text-sm gap-3 md:gap-4">
        <p>&copy; {new Date().getFullYear()} Aakarshala Studio. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
