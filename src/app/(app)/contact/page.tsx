'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, XCircle, MapPin, Phone, Mail, MessageCircle, Plus, Minus, Camera, Briefcase, Pin, Brush } from 'lucide-react'

const faqs = [
  { question: 'How do consultations work?', answer: 'Our consultations begin with an initial discovery phase where we discuss your vision, requirements, and budget. From there, we propose a tailored design direction.' },
  { question: 'What happens after payment?', answer: 'Once your consultation fee is processed, our team will contact you within 24 hours to schedule the session and provide you with a pre-consultation questionnaire.' },
  { question: 'Do you undertake projects outside the city?', answer: 'Yes, we take on select premium projects nationally and internationally. Travel and logistics will be discussed during the consultation.' },
  { question: 'Can consultations be held online?', answer: 'Absolutely. We offer virtual consultations via Zoom or Google Meet, which are highly effective for initial planning and concept discussions.' },
  { question: 'How long does a project usually take?', answer: 'Timelines vary greatly based on scope. A full residential interior project typically takes 4-8 months, while architectural builds can take 12-24 months.' },
  { question: 'Can I reschedule my consultation?', answer: 'Yes, you can reschedule up to 48 hours before your booked slot without any additional charges.' },
]

export default function ContactPage() {
  const containerRef = useRef(null)

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    projectType: 'architecture',
    projectLocation: '',
    budgetRange: '',
    preferredDate: '',
    message: '',
    package: 'basic',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMockPayment, setShowMockPayment] = useState(false)
  const [pendingConsultationId, setPendingConsultationId] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/create-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to create order')

      setPendingConsultationId(data.consultationId)
      setShowMockPayment(true)

    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMockPayment = async (success: boolean) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/mock-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultationId: pendingConsultationId, success }),
      })

      if (res.ok) {
        window.location.href = `/consultation/success?id=${pendingConsultationId}`
      } else {
        alert('Payment failed. Please try again.')
        setShowMockPayment(false)
      }
    } catch (error) {
      console.error(error)
      alert('Payment simulation failed.')
      setShowMockPayment(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 md:px-8 border-b border-border/50 bg-background/50 overflow-hidden">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8"
          >
            Let&apos;s Create <span className="text-accent italic font-light">Together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            We believe every extraordinary space begins with a meaningful conversation. Whether you&apos;re planning a residence, workspace, or hospitality project, our team would love to hear your vision.
          </motion.p>
        </div>
      </section>

      {/* 2. Contact Information Section */}
      <section className="py-24 px-4 md:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { icon: <Mail className="w-6 h-6" />, title: 'Email', text: 'mailtoaakarshala@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mailtoaakarshala@gmail.com' },
                { icon: <Phone className="w-6 h-6" />, title: 'Phone', text: '+91 94511 77570', href: 'tel:+919451177570' },
                { icon: <MessageCircle className="w-6 h-6" />, title: 'WhatsApp', text: '+91 94511 77570', href: 'https://wa.me/919451177570' },
                { icon: <MapPin className="w-6 h-6" />, title: 'Office Address', text: 'Shop No. 9, Scorpio Club, Kursi Road, Lucknow', href: '#location' },
              ].map((card, i) => (
                <a
                  key={i}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : '_self'}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-card p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-accent/50 transition-all duration-300 group flex flex-col items-start"
                >
                  <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full text-foreground group-hover:bg-accent group-hover:text-white transition-colors duration-300 mb-6">
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
                  <p className="text-foreground/70">{card.text}</p>
                </a>
              ))}
              <div className="sm:col-span-2 bg-card p-8 rounded-2xl border border-border/50 shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-semibold mb-1">Business Hours</h4>
                  <p className="text-foreground/70">Monday – Saturday</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-accent">9:00 AM – 7:00 PM</p>
                  <p className="text-sm text-foreground/50">Sunday Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Premium Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative h-[600px] rounded-3xl overflow-hidden group shadow-xl"
            >
              <Image
                src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781899764/IMG-20251016-WA0004_hvessu.jpg"
                alt="Aakarshala Office"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Consultation Booking Section */}
      <section className="py-24 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900 border-y border-border/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">Book a Consultation</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Tell us about your project and begin your journey with Aakarshala. Complete the form below to secure your consultation slot.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
              <div className="relative group">
                <input required name="fullName" id="fullName" placeholder=" " value={formData.fullName} onChange={handleChange} className="block w-full px-4 py-4 bg-transparent border-b-2 border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent peer text-lg transition-colors" />
                <label htmlFor="fullName" className="absolute text-foreground/50 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none">Full Name *</label>
              </div>
              <div className="relative group">
                <input required type="email" name="email" id="email" placeholder=" " value={formData.email} onChange={handleChange} className="block w-full px-4 py-4 bg-transparent border-b-2 border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent peer text-lg transition-colors" />
                <label htmlFor="email" className="absolute text-foreground/50 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none">Email Address *</label>
              </div>
              <div className="relative group">
                <input required name="phoneNumber" id="phoneNumber" placeholder=" " value={formData.phoneNumber} onChange={handleChange} className="block w-full px-4 py-4 bg-transparent border-b-2 border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent peer text-lg transition-colors" />
                <label htmlFor="phoneNumber" className="absolute text-foreground/50 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none">Phone Number *</label>
              </div>
              <div className="relative group">
                <input name="whatsappNumber" id="whatsappNumber" placeholder=" " value={formData.whatsappNumber} onChange={handleChange} className="block w-full px-4 py-4 bg-transparent border-b-2 border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent peer text-lg transition-colors" />
                <label htmlFor="whatsappNumber" className="absolute text-foreground/50 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none">WhatsApp Number</label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70 pl-4">Project Type *</label>
                <select required name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-input/50 border-b-2 border-border px-4 py-3 focus:outline-none focus:border-accent text-lg appearance-none cursor-pointer">
                  <option value="architecture">Architecture</option>
                  <option value="interior">Interior Design</option>
                  <option value="landscape">Landscape</option>
                  <option value="renovation">Renovation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70 pl-4">Preferred Consultation Date</label>
                <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="w-full bg-transparent border-b-2 border-border px-4 py-3 focus:outline-none focus:border-accent text-lg" />
              </div>

              <div className="relative group md:col-span-2">
                <input required name="projectLocation" id="projectLocation" placeholder=" " value={formData.projectLocation} onChange={handleChange} className="block w-full px-4 py-4 bg-transparent border-b-2 border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent peer text-lg transition-colors" />
                <label htmlFor="projectLocation" className="absolute text-foreground/50 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none">Project Location (City, State) *</label>
              </div>

              <div className="relative group md:col-span-2">
                <textarea rows={3} name="message" id="message" placeholder=" " value={formData.message} onChange={handleChange} className="block w-full px-4 py-4 bg-transparent border-b-2 border-border appearance-none focus:outline-none focus:ring-0 focus:border-accent peer text-lg transition-colors resize-none"></textarea>
                <label htmlFor="message" className="absolute text-foreground/50 duration-300 transform -translate-y-6 scale-75 top-4 z-10 origin-[0] peer-focus:left-0 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pointer-events-none">Message / Requirements</label>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h3 className="font-heading text-2xl font-semibold">Consultation Package *</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${formData.package === 'basic' ? 'border-accent bg-accent/5 shadow-md' : 'border-border hover:border-accent/50'}`}>
                  <input type="radio" name="package" value="basic" checked={formData.package === 'basic'} onChange={handleChange} className="sr-only" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold text-xl block mb-1">Basic Consultation</span>
                      <span className="text-sm text-foreground/60">45-minute virtual meeting</span>
                    </div>
                    <span className="font-bold text-xl text-accent">₹2,500</span>
                  </div>
                </label>
                <label className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${formData.package === 'premium' ? 'border-accent bg-accent/5 shadow-md' : 'border-border hover:border-accent/50'}`}>
                  <input type="radio" name="package" value="premium" checked={formData.package === 'premium'} onChange={handleChange} className="sr-only" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold text-xl block mb-1">Premium Consultation</span>
                      <span className="text-sm text-foreground/60">90-minute comprehensive session</span>
                    </div>
                    <span className="font-bold text-xl text-accent">₹5,000</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || showMockPayment}
              className="w-full bg-accent text-white py-5 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all duration-300 flex items-center justify-center disabled:opacity-70 group overflow-hidden relative shadow-xl shadow-accent/20"
            >
              <span className="relative z-10 flex items-center">
                {isSubmitting && !showMockPayment ? 'Processing...' : 'Proceed to Payment'}
                {!isSubmitting && !showMockPayment && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </motion.form>
        </div>
      </section>

      {/* 4. Studio Location Section */}
      <section id="location" className="py-24 px-4 md:px-8 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4">Visit Our Studio</h2>
            <p className="text-lg text-foreground/70">We&apos;d love to welcome you to Aakarshala.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 h-[500px] relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Link href="https://maps.app.goo.gl/kciadBWFGEhAwTFt7" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20"></Link>
              <Image
                src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781900216/location_1_vl0qcf.jpg"
                alt="Studio Map Location"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 space-y-8 bg-card p-10 rounded-3xl border border-border/50 shadow-xl"
            >
              <div className="h-40 relative rounded-2xl overflow-hidden mb-8 shadow-sm">
                <Image
                  src="https://res.cloudinary.com/dpr8jejse/image/upload/v1781895969/banner_2_btp9d2.jpg"
                  alt="Aakarshala Interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold mb-2">Aakarshala Studio</h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Shop No. 9,<br />
                  Scorpio Club, Kursi Road,<br />
                  Lucknow, Uttar Pradesh 226021
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-foreground/80">
                    <Phone className="w-5 h-5 mr-3 text-accent" />
                    <span>+91 94511 77570</span>
                  </div>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mailtoaakarshala@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground/80 hover:text-accent transition-colors">
                    <Mail className="w-5 h-5 mr-3 text-accent" />
                    <span>mailtoaakarshala@gmail.com</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="https://maps.app.goo.gl/kciadBWFGEhAwTFt7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-foreground text-background py-3 rounded-full text-center font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Get Directions
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-24 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900 border-y border-border/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-foreground/70 text-lg">Everything you need to know about working with us.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:border-accent/30 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="font-semibold text-lg pr-8 group-hover:text-accent transition-colors">{faq.question}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${openFaq === index ? 'bg-accent border-accent text-white' : 'border-border text-foreground group-hover:border-accent group-hover:text-accent'}`}>
                    {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-foreground/70 leading-relaxed border-t border-border/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Social Media & CTA */}
      <section className="py-24 px-4 md:px-8 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">

          <div className="flex justify-center space-x-6 mb-20">
            {[
              { icon: <Camera className="w-6 h-6" />, label: 'Instagram' },
              { icon: <Briefcase className="w-6 h-6" />, label: 'LinkedIn' },
              { icon: <Pin className="w-6 h-6" />, label: 'Pinterest' },
              { icon: <Brush className="w-6 h-6" />, label: 'Behance' },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent hover:bg-accent/20 hover:shadow-[0_0_20px_rgba(200,160,100,0.3)] transition-all duration-300"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="space-y-8"
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">Begin Your Design Journey</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
              From ideas to execution, Aakarshala crafts spaces that inspire and endure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
              <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="bg-white text-black px-10 py-5 rounded-full font-medium hover:bg-neutral-200 transition-colors duration-300 w-full sm:w-auto">
                Book Consultation
              </button>
              <a href="tel:+919451177570" className="border border-neutral-700 text-white px-10 py-5 rounded-full font-medium hover:bg-neutral-800 transition-colors duration-300 w-full sm:w-auto">
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mock Payment Modal */}
      <AnimatePresence>
        {showMockPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md p-8 rounded-3xl shadow-2xl border border-border relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <h2 className="text-2xl font-bold mb-4 text-center">Payment Gateway</h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Since Razorpay keys are not active in this environment, choose an outcome below to simulate the transaction.
              </p>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => handleMockPayment(true)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium transition-colors disabled:opacity-70"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Simulate Successful Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMockPayment(false)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-medium transition-colors disabled:opacity-70"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Simulate Failed Payment</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
