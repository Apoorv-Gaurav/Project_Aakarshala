import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const { consultationId, success } = await req.json()

    if (success) {
      const payload = await getPayload({ config: configPromise })
      
      const consultation = await payload.update({
        collection: 'consultations',
        id: consultationId,
        data: {
          status: 'paid_pending',
          paymentId: 'mock_txn_' + Math.random().toString(36).substring(7),
        },
      })

      // Send Email via Resend
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'demo') {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY)
          await resend.emails.send({
            from: 'Aakarshala <onboarding@resend.dev>',
            to: 'admin@aakarshala.com',
            subject: `New Consultation Booking: ${consultation.fullName}`,
            html: `<p>A new consultation has been booked and paid for.</p>
                    <p><strong>Name:</strong> ${consultation.fullName}</p>
                    <p><strong>Phone:</strong> ${consultation.phoneNumber}</p>
                    <p><strong>Package:</strong> ${consultation.package}</p>`
          })
          console.log('Resend email sent')
        } catch (emailErr) {
          console.error('Failed to send Resend email:', emailErr)
        }
      }

      // Send WhatsApp Notification via WhatsApp Cloud API
      if (
        process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_ACCESS_TOKEN !== 'demo' &&
        process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_PHONE_NUMBER_ID !== 'demo' &&
        process.env.WHATSAPP_ADMIN_PHONE_NUMBER && process.env.WHATSAPP_ADMIN_PHONE_NUMBER !== 'demo'
      ) {
        try {
          const whatsappRes = await fetch(
            `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER,
                type: 'text',
                text: {
                  body: `🎉 New Consultation Booked!\n\nName: ${consultation.fullName}\nPhone: ${consultation.phoneNumber}\nPackage: ${consultation.package}`
                }
              })
            }
          )
          
          if (!whatsappRes.ok) {
            const errData = await whatsappRes.json()
            console.error('Failed to send WhatsApp message:', errData)
          } else {
            console.log('WhatsApp message sent')
          }
        } catch (waErr) {
          console.error('Failed to call WhatsApp API:', waErr)
        }
      }
      
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Payment failed by user.' }, { status: 400 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Mock verification failed' }, { status: 500 })
  }
}
