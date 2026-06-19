import { NextResponse } from 'next/server'
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

    return NextResponse.json({
      consultationId: consultation.id,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create consultation' }, { status: 500 })
  }
}
