import express from 'express';
import Stripe from 'stripe';
import fetch from 'node-fetch';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email;

    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/user_profiles?email=eq.${customerEmail}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({ role: 'premium' })
      });

      if (!response.ok) throw new Error('Failed to update user role');
      console.log(`✅ Upgraded ${customerEmail} to premium`);
      res.status(200).json({ received: true });
    } catch (err) {
      console.error('❌ Supabase role update failed:', err.message);
      res.status(500).send('Supabase update error');
    }
  } else {
    res.status(200).json({ received: true });
  }
});

export default router;