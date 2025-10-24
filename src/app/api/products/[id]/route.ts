// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    );
  }
}
