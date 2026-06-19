'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || 'Failed to create order')
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_key',
        amount: data.amount,
        currency: 'INR',
        name: 'Aakarshala',
        description: 'Consultation Booking',
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              consultationId: data.consultationId
            })
          })
          
          if (verifyRes.ok) {
            window.location.href = `/consultation/success?id=${data.consultationId}`
          } else {
            alert('Payment verification failed.')
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phoneNumber
        },
        theme: {
          color: '#1a1a1a'
        }
      }
      
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
      
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-24">
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
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
          </button>
        </motion.form>
      </div>
      
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
    </div>
  )
}
