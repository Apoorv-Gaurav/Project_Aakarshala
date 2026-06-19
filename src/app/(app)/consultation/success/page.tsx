'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-lg mx-auto bg-card p-12 rounded-2xl border border-border shadow-lg"
    >
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-muted-foreground mb-6">
        Your payment was successful and your consultation has been booked. Our team will contact you shortly with the meeting details.
      </p>
      <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg mb-8 text-sm text-left">
        <span className="text-muted-foreground block mb-1">Booking Reference ID:</span>
        <span className="font-mono font-medium">{id || 'Pending'}</span>
      </div>
      <Link 
        href="/"
        className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Return to Home
      </Link>
    </motion.div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-24">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
