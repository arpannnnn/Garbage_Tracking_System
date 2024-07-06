// pages/api/initiate-payment.js

import { v4 as uuidv4 } from 'uuid';
import db from '../../lib/firebaseAdmin'; // Your Firebase admin configuration

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, planType } = req.body;
  const transactionId = uuidv4();

  // Save the transaction details to your database
  await db.collection('transactions').doc(transactionId).set({
    amount,
    planType,
    status: 'pending',
    createdAt: new Date(),
  });

  res.status(200).json({ transactionId, amount });
}
