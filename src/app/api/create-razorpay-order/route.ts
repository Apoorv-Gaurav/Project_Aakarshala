import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const payload = await getPayload({ config: configPromise })

    const consultation = await payload.create({
      collection: 'consultations',
      data: {
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        whatsappNumber: body.whatsappNumber,
        projectType: body.projectType,
        projectLocation: body.projectLocation,
        budgetRange: body.budgetRange,
        preferredDate: body.preferredDate || undefined,
        message: body.message,
        package: body.package,
        status: 'pending_payment',
      },
    })

    const amount = body.package === 'premium' ? 500000 : 250000 // In paise (multiply by 100)

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    })

    const orderOptions = {
      amount,
      currency: 'INR',
      receipt: `receipt_${consultation.id}`,
    }

    const order = await razorpay.orders.create(orderOptions)

    return NextResponse.json({
      orderId: order.id,
      amount,
      consultationId: consultation.id,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
