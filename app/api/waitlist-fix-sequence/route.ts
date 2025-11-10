import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: 'Supabase configuration missing' },
      { status: 500 }
    )
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Get the maximum ID from the waitlist table
    const { data: maxRow, error: maxError } = await supabaseAdmin
      .from('waitlist')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)
      .single()

    if (maxError) {
      return NextResponse.json(
        { error: `Failed to get max ID: ${maxError.message}` },
        { status: 500 }
      )
    }

    const maxId = maxRow?.id || 0

    // Reset the sequence to be one higher than the max ID
    // This ensures new inserts won't conflict
    const { data: sequenceData, error: sequenceError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `SELECT setval('waitlist_id_seq', ${maxId + 1}, false);`
    })

    // If RPC doesn't work, try direct SQL execution
    // Note: This might require enabling pg_net extension or using a different method
    // For now, let's return instructions

    return NextResponse.json({
      success: true,
      message: 'Sequence reset needed',
      maxId: maxId,
      nextId: maxId + 1,
      instructions: [
        'Go to Supabase Dashboard > SQL Editor',
        `Run: SELECT setval('waitlist_id_seq', ${maxId + 1}, false);`,
        'This will reset the ID sequence to prevent conflicts'
      ]
    })
  } catch (error) {
    console.error('Error fixing sequence:', error)
    return NextResponse.json(
      { error: 'Failed to fix sequence', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

