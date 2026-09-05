import { handleContact } from "@/lib/contact-handler";
export const runtime = "nodejs";
export async function POST(request: Request) { return handleContact(request); }
