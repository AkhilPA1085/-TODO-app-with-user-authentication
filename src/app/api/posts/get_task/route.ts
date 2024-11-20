import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const {searchParams} = new URL(request.url)
        const id = searchParams.get('id')
        const response = await Post.findById({_id:id})
        if(!id){
            return NextResponse.json({success:false,data:'Invalid request'},{status:400})
        }
        return NextResponse.json({success:true,data:response},{status:201})
    } catch (error) {
        return NextResponse.json({success:false,data:error},{status:500})
    }
}