import db from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  const { oid } = req.query;

  // Update the transaction status in your database
  await db.collection('transactions').doc(oid).update({
    status: 'failed',
    updatedAt: new Date(),
  });

  res.redirect('/failure'); // Redirect to a failure page
}