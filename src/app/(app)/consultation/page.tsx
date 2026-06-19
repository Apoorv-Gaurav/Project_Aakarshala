'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'

export default function ConsultationPage() {
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

  const handleChange = (e: any) => {
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
    <div className="min-h-screen bg-background py-24 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Book a Consultation</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take the first step towards realizing your vision. Schedule a consultation with our principal architects.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name *</label>
              <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number *</label>
              <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">WhatsApp Number</label>
              <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Type *</label>
              <select required name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="architecture">Architecture</option>
                <option value="interior">Interior Design</option>
                <option value="landscape">Landscape</option>
                <option value="renovation">Renovation</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Location *</label>
              <input required name="projectLocation" value={formData.projectLocation} onChange={handleChange} className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          
          <div className="space-y-2 mb-8">
            <label className="text-sm font-medium">Project Requirements / Message</label>
            <textarea rows={4} name="message" value={formData.message} onChange={handleChange} className="w-full bg-input/50 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"></textarea>
          </div>

          <div className="space-y-4 mb-10">
            <h3 className="text-lg font-medium">Select Consultation Package *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`border rounded-xl p-6 cursor-pointer transition-all ${formData.package === 'basic' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <input type="radio" name="package" value="basic" checked={formData.package === 'basic'} onChange={handleChange} className="sr-only" />
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">Basic</span>
                  <span className="font-medium text-muted-foreground">₹2,500</span>
                </div>
                <p className="text-sm text-muted-foreground">45-minute virtual consultation with a senior designer.</p>
              </label>
              <label className={`border rounded-xl p-6 cursor-pointer transition-all ${formData.package === 'premium' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <input type="radio" name="package" value="premium" checked={formData.package === 'premium'} onChange={handleChange} className="sr-only" />
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">Premium</span>
                  <span className="font-medium text-muted-foreground">₹5,000</span>
                </div>
                <p className="text-sm text-muted-foreground">90-minute comprehensive site analysis and virtual meeting.</p>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || showMockPayment}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting && !showMockPayment ? 'Processing...' : 'Proceed to Payment'}
            {!isSubmitting && !showMockPayment && <ArrowRight className="ml-2 w-5 h-5" />}
          </button>
        </motion.form>
      </div>
      
      {/* Mock Payment Modal */}
      <AnimatePresence>
        {showMockPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md p-8 rounded-2xl shadow-2xl border border-border relative"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Payment Simulation</h2>
              <p className="text-muted-foreground text-center mb-8">
                Since Razorpay is disabled, choose an outcome to simulate the payment process.
              </p>
              
              <div className="space-y-4">
                <button 
                  type="button"
                  onClick={() => handleMockPayment(true)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-70"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Pass Payment</span>
                </button>
                <button 
                  type="button"
                  onClick={() => handleMockPayment(false)}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-70"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Fail Payment</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
