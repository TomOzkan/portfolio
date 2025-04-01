import { NextResponse as KeyNextResponse } from "next/server";

export async function GET() {
  return KeyNextResponse.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
}
