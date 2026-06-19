import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Find existing users
    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.docs.length > 0) {
      const user = users.docs[0]
      // Reset password for the first user found
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          password: 'password123',
        },
      })
      return NextResponse.json({ 
        success: true, 
        message: `Password for ${user.email} has been reset to: password123` 
      })
    } else {
      // Create a new admin user if none exists
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@aakarshala.com',
          password: 'password123',
        },
      })
      return NextResponse.json({ 
        success: true, 
        message: "Admin user created! Email: admin@aakarshala.com | Password: password123" 
      })
    }

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to reset admin credentials' }, { status: 500 })
  }
}
