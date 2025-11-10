import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
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
    // Get the maximum ID from the waitlist table
    // This is the most accurate count if IDs are sequential
    const { data: allRows, error: dataError } = await supabaseAdmin
      .from('waitlist')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)

    if (dataError) {
      console.error('Error fetching max ID:', dataError)
      return NextResponse.json(
        { error: dataError.message },
        { status: 500 }
      )
    }

    // Get the maximum ID
    const maxId = allRows && allRows.length > 0 ? allRows[0].id : 0

    console.log('Max ID from waitlist:', maxId)

    // Use the max ID as the count
    return NextResponse.json({ count: maxId })
  } catch (error) {
    console.error('Error fetching waitlist count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch waitlist count' },
      { status: 500 }
    )
  }
}

