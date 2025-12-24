export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    message: 'Amira Beauty API is running',
    timestamp: new Date().toISOString()
  });
}
