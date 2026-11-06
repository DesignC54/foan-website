// Contact form → email via Resend (https://resend.com, REST API, no SDK).
// Vercel env vars:
//   RESEND_API_KEY   required to send; without it the form falls back to
//                    opening the visitor's email app (status 503).
//   CONTACT_TO       default info@foangroup.com
//   CONTACT_FROM     default "FOAN Website <website@foangroup.com>"
//                    (the domain must be verified in Resend)

const MAX = { name: 120, email: 200, phone: 40, company: 160, subject: 200, message: 5000 };
type Field = keyof typeof MAX;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof data.website === "string" && data.website) {
    return Response.json({ ok: true });
  }

  const v = {} as Record<Field, string>;
  for (const k of Object.keys(MAX) as Field[]) {
    v[k] = typeof data[k] === "string" ? (data[k] as string).trim().slice(0, MAX[k]) : "";
  }
  if (!v.name || !v.subject || !v.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    return Response.json(
      { error: "Please fill in your name, a valid email, a subject and a message." },
      { status: 422 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ fallback: "mailto" }, { status: 503 });

  const rows: [string, string][] = [
    ["Name", v.name],
    ["Email", v.email],
    ["Phone", v.phone],
    ["Company", v.company],
  ];
  const html = `<table cellpadding="6" style="font:14px/1.5 sans-serif">${rows
    .filter(([, x]) => x)
    .map(([k, x]) => `<tr><td style="color:#666">${k}</td><td>${esc(x)}</td></tr>`)
    .join("")}</table><p style="font:14px/1.6 sans-serif;white-space:pre-wrap">${esc(v.message)}</p>`;
  const text = `${rows.filter(([, x]) => x).map(([k, x]) => `${k}: ${x}`).join("\n")}\n\n${v.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "FOAN Website <website@foangroup.com>",
      to: [process.env.CONTACT_TO ?? "info@foangroup.com"],
      reply_to: v.email,
      subject: `[Website] ${v.subject}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ fallback: "mailto" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
