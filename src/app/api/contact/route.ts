import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["name", "email", "service", "budget", "message"];
  if (required.some((key) => !body?.[key])) return NextResponse.json({ok:false,error:"Missing required fields"},{status:400});
  const email = String(body.email);
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ok:false,error:"Invalid email"},{status:400});
  // Production hook: forward this payload to Resend/CRM/server-side integration.
  console.info("WD project brief", { ...body, receivedAt: new Date().toISOString() });
  return NextResponse.json({ok:true});
}
