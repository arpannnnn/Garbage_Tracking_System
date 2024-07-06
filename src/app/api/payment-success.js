import db from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  const { oid } = req.query;

  // Verify the transaction with eSewa (you may need to call an eSewa API for this)

  // Update the transaction status in your database
  await db.collection('transactions').doc(oid).update({
    status: 'completed',
    updatedAt: new Date(),
  });

  res.redirect('/success'); // Redirect to a success page
}