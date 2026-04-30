const crypto = require("crypto");

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function computeCode(email, secret, windowOffset) {
  const window = Math.floor(Date.now() / WINDOW_MS) - windowOffset;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(`${email}:${window}`);
  const hex = hmac.digest("hex");
  return String(parseInt(hex.slice(0, 8), 16) % 1000000).padStart(6, "0");
}

module.exports = (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const secret = process.env.VERIFICATION_SECRET;
  if (!secret) return res.status(500).json({ error: "Server not configured" });

  const { email, code } = req.body || {};
  if (!email || !code) return res.status(400).json({ error: "Missing fields" });

  // Accept current window and previous window (handles boundary edge cases)
  const valid = computeCode(email, secret, 0) === code || computeCode(email, secret, 1) === code;
  return res.status(200).json({ success: valid });
};
