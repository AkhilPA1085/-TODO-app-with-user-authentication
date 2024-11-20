import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest){
    try {
        const {searchParams} = new URL(request.url)
        const id = searchParams.get('id')
        if(!id){
            return NextResponse.json({message:'User Id is needed'},{status:400})
        }

        const todos = await Post.find({assignedTo:id})

        return NextResponse.json({todos,success:true},{status:201})

    } catch (error) {
       return NextResponse.json({error:`Something went wrong,${error}`,success:false},{status:500}) 
    }
}