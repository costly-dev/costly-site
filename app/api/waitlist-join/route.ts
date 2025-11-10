import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Supabase configuration missing' },
      { status: 500 }
    )
  }

  // Create admin client with service_role key (bypasses RLS)
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    const body = await request.json()
    const { email } = body

    console.log('[API] Received email submission:', email)

    if (!email || typeof email !== 'string') {
      console.error('[API] Email validation failed: missing or invalid type')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Normalize email: lowercase and trim whitespace
    const normalizedEmail = email.trim().toLowerCase()
    console.log('[API] Normalized email:', normalizedEmail)

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      console.error('[API] Email format validation failed')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert email using service_role key (bypasses RLS)
    // Let the database handle the unique constraint - no pre-checking
    console.log('[API] Inserting email into waitlist:', normalizedEmail)
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([{ email: normalizedEmail }])
      .select()

    if (error) {
      console.error('[API] Error inserting email:', error)
      console.error('[API] Error code:', error.code)
      console.error('[API] Error message:', error.message)
      console.error('[API] Error details:', JSON.stringify(error, null, 2))
      
      // Check if it's a duplicate key error
      if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        console.log('[API] Duplicate key error detected, but email was not found in check. This might be a race condition or case-sensitivity issue.')
        // Try to fetch the actual email from database to see what's there
        const { data: actualEmail } = await supabaseAdmin
          .from('waitlist')
          .select('email')
          .ilike('email', normalizedEmail)
          .limit(1)
        console.log('[API] Actual email in database:', actualEmail)
        
        return NextResponse.json(
          { error: 'This email is already on the waitlist!' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: error.message || 'Failed to add email to waitlist', details: error },
        { status: 500 }
      )
    }

    console.log('[API] Successfully inserted email:', normalizedEmail, 'Data:', data)
    return NextResponse.json({ 
      success: true, 
      message: 'Email added to waitlist',
      data 
    })
  } catch (error) {
    console.error('[API] Error processing request:', error)
    if (error instanceof Error) {
      console.error('[API] Error message:', error.message)
      console.error('[API] Error stack:', error.stack)
    }
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

