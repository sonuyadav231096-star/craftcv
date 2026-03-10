const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    console.error('RAZORPAY_KEY_SECRET is not defined');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required payment verification parameters' });
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure', error: 'Invalid signature' });
  }
};
