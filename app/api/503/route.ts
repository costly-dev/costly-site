import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse(
    JSON.stringify({
      error: 'Service Unavailable',
      message: 'This service is temporarily unavailable. Please check back later.',
      status: 503
    }),
    {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '3600' // Retry after 1 hour
      }
    }
  )
}
