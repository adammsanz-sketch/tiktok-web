import { NextRequest, NextResponse } from 'next/server'
import 'dotenv/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as any
    const name = String(body?.name || '').trim()
    const service = String(body?.service || '').trim()
    const message = String(body?.message || '').trim()
    const replyTo = typeof body?.email === 'string' ? String(body.email).trim() : undefined

    if (!name || !message) {
      return NextResponse.json({ error: 'Missing name or message' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const subject = `Automation Inquiry - ${name}`
    const text = `Nama: ${name}\nServis: ${service || '-'}\nMesej: ${message}`
    const html = `<p><strong>Nama:</strong> ${name}</p><p><strong>Servis:</strong> ${service || '-'}</p><p><strong>Mesej:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'no-reply@sanztech.online',
        to: 'mayasanztech@gmail.com',
        subject,
        text,
        html,
        reply_to: replyTo,
      }),
    })

    const data = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      return NextResponse.json({ error: data?.message || 'Email send failed' }, { status: 502 })
    }

    return NextResponse.json({ sent: true, id: data?.id || null })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Contact submit error' }, { status: 500 })
  }
}
