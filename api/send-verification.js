const { Resend } = require("resend");
const crypto = require("crypto");

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function generateCode(email, secret) {
  const window = Math.floor(Date.now() / WINDOW_MS);
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(`${email}:${window}`);
  const hex = hmac.digest("hex");
  return String(parseInt(hex.slice(0, 8), 16) % 1000000).padStart(6, "0");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const secret = process.env.VERIFICATION_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

  if (!secret || !apiKey) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const code = generateCode(email, secret);
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "【Homeworks】メール認証コード",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
          <h2 style="margin:0 0 16px;font-size:20px">メール認証</h2>
          <p style="margin:0 0 24px;color:#555">以下の認証コードを入力してください。</p>
          <div style="background:#f4f4f5;border-radius:8px;padding:24px;text-align:center;letter-spacing:8px;font-size:36px;font-weight:700;font-variant-numeric:tabular-nums">
            ${code}
          </div>
          <p style="margin:24px 0 0;font-size:13px;color:#888">このコードは10分間有効です。身に覚えのない場合は無視してください。</p>
        </div>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (_err) {
    return res.status(500).json({ error: "Failed to send email" });
  }
};
