import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

// GET /api/nurses
export async function GET() {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_URL is not configured" },
      { status: 500 }
    );
  }

  // Call your FastAPI backend
  const res = await fetch(`${BACKEND_URL}/nurses`);

  if (!res.ok) {
    console.error("Error fetching nurses from backend:", res.status, res.statusText);
    return NextResponse.json(
      { error: "Failed to fetch nurses" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}


// POST /api/nurses -> FastAPI /addnurses
export async function POST(req: NextRequest) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_URL is not configured" },
      { status: 500 }
    );
  }

  const body = await req.json(); // e.g. { name: "Alice" }

  const res = await fetch(`${BACKEND_URL}/addnurses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Error creating nurse:", res.status, res.statusText);
    return NextResponse.json(
      { error: "Failed to create nurse" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 201 });
}