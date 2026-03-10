module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RAZORPAY_KEY_ID) {
    console.error('RAZORPAY_KEY_ID is not defined');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  res.status(200).json({
    razorpay_key_id: process.env.RAZORPAY_KEY_ID
  });
};
