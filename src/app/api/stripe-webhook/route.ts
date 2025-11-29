import { NextRequest, NextResponse } from 'next/server'
import 'dotenv/config'

function getAutomationBaseUrl() {
  return (
    process.env.SANZTECH_AUTOMATION_BASE_URL ||
    process.env.NEXT_API_BASE_URL ||
    'http://localhost:9004'
  )
}

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()
    if (event?.type === 'checkout.session.completed') {
      const session = event?.data?.object || {}
      const sku = session?.metadata?.sku
      const orderId = session?.id
      const amount = (session?.amount_total || 0) / 100
      const currency = String(session?.currency || 'myr').toUpperCase()
      const customer = session?.customer_details?.email || session?.customer_email || 'unknown'

      const base = getAutomationBaseUrl()
      const message = `PAYMENT OK | order=${orderId} amount=${amount} ${currency} customer=${customer} items=${sku || ''} -> please deliver purchased template(s) to customer`
      try {
        const resp = await fetch(`${base}/api/maya/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId: `payment_${orderId}`, userId: 'bio-new-stripe', message }),
        })
        const ok = resp.ok
        return NextResponse.json({ received: true, delivered: ok })
      } catch {
        return NextResponse.json({ received: true, delivered: false }, { status: 502 })
      }
    }
    return NextResponse.json({ received: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Webhook error' }, { status: 400 })
  }
}