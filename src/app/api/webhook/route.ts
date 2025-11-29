import { NextRequest, NextResponse } from "next/server"

function isAuthorized(secretHeader?: string | null, secretQuery?: string | null, secretBody?: string | null) {
  const expected = process.env.WEBHOOK_SECRET
  const candidate = secretHeader || secretQuery || secretBody || null
  const isDevBypass = process.env.NODE_ENV !== "production" && candidate === "dev"
  if (isDevBypass) return true
  return Boolean(expected && candidate && expected === candidate)
}

function getAutomationBaseUrl() {
  return (
    process.env.SANZTECH_AUTOMATION_BASE_URL ||
    process.env.NEXT_API_BASE_URL ||
    "http://localhost:9004"
  )
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const secretHeader = req.headers.get("x-webhook-secret")
    const secretQuery = url.searchParams.get("secret")
    let body = await req.json().catch(() => null)
    const secretBody = body && typeof body === "object" ? String((body as any).secret ?? "") || null : null
    if (!isAuthorized(secretHeader, secretQuery, secretBody)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }
    
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const eventType = String(body.eventType || body.type || "")
    const orderId = String(body.orderId || body.id || "")
    const customer = body.customer || {}
    const items = Array.isArray(body.items) ? body.items : []
    const amount = body.amount ?? null
    const currency = body.currency ?? "MYR"

    if (!eventType) {
      return NextResponse.json({ error: "Missing eventType" }, { status: 400 })
    }

    if (eventType === "payment_succeeded") {
      const base = getAutomationBaseUrl()
      const message = `PAYMENT OK | order=${orderId} amount=${amount} ${currency} customer=${customer?.email || customer?.name || "unknown"} items=${items.map((i: any) => i?.sku || i?.name || i).join(",")} -> please deliver purchased template(s) to customer`

      const resp = await fetch(`${base}/api/maya/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: `payment_${orderId || Date.now()}`,
          userId: "bio-new-webhook",
          message,
        }),
      })

      const ok = resp.ok
      return NextResponse.json({ delivered: ok, forwardedTo: `${base}/api/maya/chat` }, { status: ok ? 200 : 502 })
    }

    if (eventType === "payment_failed") {
      return NextResponse.json({ status: "ignored", reason: "payment_failed" }, { status: 200 })
    }

    return NextResponse.json({ status: "ignored", eventType }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json(
      { error: "Webhook handler error", details: String(e?.message || e) },
      { status: 500 }
    )
  }
}