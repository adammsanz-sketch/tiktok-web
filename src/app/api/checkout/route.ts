import { NextRequest, NextResponse } from 'next/server'
import 'dotenv/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as any
    const sku = String(body?.sku || body?.items?.[0]?.sku || '')
    const customerEmail = typeof body?.customerEmail === 'string' ? body.customerEmail : undefined
    const successUrl = String(body?.successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/shop?payment=success`)
    const cancelUrl = String(body?.cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/shop?payment=cancel`)

    const secret = process.env.STRIPE_SECRET_KEY
    const priceMapJson = process.env.STRIPE_PRICE_MAP_JSON || '{}'
    const priceMap = JSON.parse(priceMapJson as string || '{}') as Record<string, string>
    const priceId = priceMap[sku] || process.env.STRIPE_PRICE_ID_DEFAULT

    if (!secret || !priceId) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 400 })
    }

    const params = new URLSearchParams()
    params.append('mode', 'payment')
    params.append('payment_method_types[]', 'card')
    params.append('line_items[0][price]', priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('success_url', successUrl)
    params.append('cancel_url', cancelUrl)
    if (customerEmail) params.append('customer_email', customerEmail)
    if (sku) params.append('metadata[sku]', sku)
    params.append('metadata[source]', 'bio-new')

    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
    const data = await resp.json()
    if (!resp.ok) {
      return NextResponse.json({ error: data?.error?.message || 'Stripe error' }, { status: 502 })
    }
    return NextResponse.json({ url: data?.url })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Checkout error' }, { status: 500 })
  }
}