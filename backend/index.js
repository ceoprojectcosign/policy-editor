import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error('❌ Stripe session error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Version History (Mocked)
app.get('/api/versions/:docId', async (req, res) => {
  const { docId } = req.params
  const mockData = [
    { version: 'v1', timestamp: new Date().toISOString() },
    { version: 'v2', timestamp: new Date().toISOString() }
  ]
  res.json(mockData)
})

// Web Scraper (PDF finder)
app.post('/api/scrape-pdfs', async (req, res) => {
  const { url } = req.body
  try {
    const html = await fetch(url).then(r => r.text())
    const matches = [...html.matchAll(/href=["']([^"']+\.pdf)["']/gi)]
    const links = matches.map(m => m[1])
    res.json({ links })
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape PDF links' })
  }
})

// AI Summary (mock or proxy to OpenAI/local model)
app.post('/api/summarize', async (req, res) => {
  const { text } = req.body
  // 👇 This is a placeholder — swap in real AI logic or API
  res.json({ summary: `Summary: ${text.slice(0, 100)}...` })
})

// Stripe Webhook to upgrade users
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const customerEmail = session.customer_email

    try {
      const supabaseRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/user_profiles?email=eq.${customerEmail}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({ role: 'premium' })
      })
      if (!supabaseRes.ok) throw new Error('Failed to update user role')
      res.json({ received: true })
    } catch (err) {
      console.error('❌ Supabase role update failed:', err.message)
      res.status(500).send('Supabase update error')
    }
  } else {
    res.json({ received: true })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🔥 Backend running on http://localhost:${PORT}`))
