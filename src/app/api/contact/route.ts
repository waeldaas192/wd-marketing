import { NextResponse } from "next/server";
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 12000) return NextResponse.json({ok:false,error:"Request too large"},{status:413});
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid payload");
    body = parsed as Record<string,unknown>;
  } catch { return NextResponse.json({ok:false,error:"Invalid request"},{status:400}); }
  const required = ["name","email","service","budget","message"];
  if (required.some(key => typeof body[key] !== "string" || !(body[key] as string).trim())) return NextResponse.json({ok:false,error:"Missing required fields"},{status:400});
  if (!/^\S+@\S+\.\S+$/.test(String(body.email))) return NextResponse.json({ok:false,error:"Invalid email"},{status:400});
  // Launch gate: no personal-data logging, no false success. Replace only after
  // a real email/CRM provider has acknowledged successful delivery or persistence.
  return NextResponse.json({ok:false,error:"Online delivery is not configured. Please email hello@wdmarketing.co.uk."},{status:503});
}
