import { NextResponse } from "next/server";

export async function GET() {
    try{
        const res = await fetch(`https://fakestoreapi.com/products`)
        const products = await res.json();
    return NextResponse.json(products)
}catch (error){
    console.error('Fetch failed:', error)
    return NextResponse.json({error:"Failed to fetch data from API"}, {status: 500})
}
}