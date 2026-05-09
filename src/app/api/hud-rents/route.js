import { NextResponse } from "next/server";
import { getHUDRents } from "@/lib/hudRents";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getHUDRents();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
