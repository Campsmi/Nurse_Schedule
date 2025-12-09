// app/api/nurses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

// IMPORTANT: we do NOT destructure `params` in the arguments.
// We take a `context` object, and await `context.params` inside.
type ParamsPromise = Promise<{ id: string }>;

export async function DELETE(
  _req: NextRequest,
  context: { params: ParamsPromise }
) {
  const { id } = await context.params; // ✅ await before using id

  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_URL is not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(`${BACKEND_URL}/nurses/${id}`, {
    method: "DELETE",
  });

  // FastAPI may return 204 No Content, so don't assume JSON
  if (!res.ok && res.status !== 204) {
    let data: any = {};
    try {
      data = await res.json();
    } catch {
      // ignore if no JSON
    }

    return NextResponse.json(
      data || { error: "Failed to delete nurse" },
      { status: res.status }
    );
  }

  // Always return JSON so the frontend can safely call res.json()
  return NextResponse.json({ success: true }, { status: 200 });
}
