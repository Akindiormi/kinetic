import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      data: {
        service: "kinetic-api",
        status: "ok",
        version: "v1",
        timestamp: new Date().toISOString(),
        dependencies: {
          database: "not_configured",
          payments: "not_configured",
          messaging: "not_configured",
        },
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
