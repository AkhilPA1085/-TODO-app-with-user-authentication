import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Post from '@/models/postModel'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqestBody = await request.json();
        const { item, userId } = reqestBody;

        const user = await User.findOne({ _id: userId })
        if (user) {
            const newPost = new Post({
                data: item,
                userId: userId
            })
            let savedData = await newPost.save();
            return NextResponse.json({message:'Post added',success:true,savedData},{status:201})
        }else{
            return NextResponse.json({error:'Unauthorized entry',success:false},{status:400})
        }
    } catch (error) {
        return NextResponse.json({ error: error, success: false }, { status: 500 })
    }
}