import { NextRequest } from "next/server";

export async function GET(request:NextRequest){
    try {
        const requestBody = await request.json();
        
    } catch (error) {
        
    }
}