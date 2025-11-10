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
    // Get all emails from waitlist
    const { data: allEmails, error: fetchError } = await supabaseAdmin
      .from('waitlist')
      .select('id, email')
      .order('id', { ascending: true })

    if (fetchError) {
      console.error('Error fetching emails:', fetchError)
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      )
    }

    if (!allEmails || allEmails.length === 0) {
      return NextResponse.json({ 
        message: 'No emails found',
        total: 0,
        duplicates: [],
        invalid: []
      })
    }

    // Analyze emails
    const emailMap = new Map<string, number[]>() // email -> array of IDs
    const invalidEmails: Array<{ id: number; email: string; reason: string }> = []
    const duplicates: Array<{ id: number; email: string; normalized: string }> = []

    // Check each email
    allEmails.forEach((row: { id: number; email: string }) => {
      const email = row.email
      const normalized = email?.trim().toLowerCase() || ''
      
      // Check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!normalized || !emailRegex.test(normalized)) {
        invalidEmails.push({
          id: row.id,
          email: email || '',
          reason: !normalized ? 'Empty email' : 'Invalid format'
        })
        return
      }

      // Track normalized emails
      if (!emailMap.has(normalized)) {
        emailMap.set(normalized, [])
      }
      emailMap.get(normalized)!.push(row.id)

      // Check if original email differs from normalized (needs cleanup)
      if (email !== normalized) {
        duplicates.push({
          id: row.id,
          email: email,
          normalized: normalized
        })
      }
    })

    // Find actual duplicates (same normalized email, multiple IDs)
    const actualDuplicates: Array<{ normalized: string; ids: number[]; emails: string[] }> = []
    emailMap.forEach((ids, normalized) => {
      if (ids.length > 1) {
        const emails = ids.map(id => {
          const row = allEmails.find((r: { id: number }) => r.id === id)
          return row?.email || ''
        })
        actualDuplicates.push({
          normalized,
          ids,
          emails
        })
      }
    })

    return NextResponse.json({
      total: allEmails.length,
      unique: emailMap.size,
      duplicates: actualDuplicates,
      needsNormalization: duplicates,
      invalid: invalidEmails,
      summary: {
        totalEmails: allEmails.length,
        uniqueEmails: emailMap.size,
        duplicateGroups: actualDuplicates.length,
        needsNormalization: duplicates.length,
        invalidEmails: invalidEmails.length
      }
    })
  } catch (error) {
    console.error('Error analyzing waitlist:', error)
    return NextResponse.json(
      { error: 'Failed to analyze waitlist' },
      { status: 500 }
    )
  }
}

// POST endpoint to clean up duplicates
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
    // Get all emails
    const { data: allEmails, error: fetchError } = await supabaseAdmin
      .from('waitlist')
      .select('id, email')
      .order('id', { ascending: true })

    if (fetchError) {
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      )
    }

    const emailMap = new Map<string, number[]>()
    const toDelete: number[] = []
    const toUpdate: Array<{ id: number; normalized: string }> = []

    // Group by normalized email
    allEmails?.forEach((row: { id: number; email: string }) => {
      const normalized = row.email?.trim().toLowerCase() || ''
      if (!emailMap.has(normalized)) {
        emailMap.set(normalized, [])
      }
      emailMap.get(normalized)!.push(row.id)
    })

    // For each normalized email, keep the first ID, delete/update others
    emailMap.forEach((ids, normalized) => {
      if (ids.length > 1) {
        // Keep the first (lowest ID), delete the rest
        const [keepId, ...deleteIds] = ids.sort((a, b) => a - b)
        toDelete.push(...deleteIds)
        
        // Also update the kept one to normalized format if needed
        const keptRow = allEmails?.find((r: { id: number }) => r.id === keepId)
        if (keptRow && keptRow.email !== normalized) {
          toUpdate.push({ id: keepId, normalized })
        }
      } else {
        // Single email, just normalize if needed
        const row = allEmails?.find((r: { id: number }) => r.id === ids[0])
        if (row && row.email !== normalized) {
          toUpdate.push({ id: ids[0], normalized })
        }
      }
    })

    // Update emails to normalized format
    const updatePromises = toUpdate.map(({ id, normalized }) =>
      supabaseAdmin
        .from('waitlist')
        .update({ email: normalized })
        .eq('id', id)
    )

    // Delete duplicates
    const deletePromises = toDelete.map(id =>
      supabaseAdmin
        .from('waitlist')
        .delete()
        .eq('id', id)
    )

    const updateResults = await Promise.all(updatePromises)
    const deleteResults = await Promise.all(deletePromises)

    const updateErrors = updateResults.filter(r => r.error)
    const deleteErrors = deleteResults.filter(r => r.error)

    return NextResponse.json({
      success: true,
      updated: toUpdate.length,
      deleted: toDelete.length,
      errors: {
        update: updateErrors.length,
        delete: deleteErrors.length
      }
    })
  } catch (error) {
    console.error('Error cleaning up waitlist:', error)
    return NextResponse.json(
      { error: 'Failed to clean up waitlist' },
      { status: 500 }
    )
  }
}

