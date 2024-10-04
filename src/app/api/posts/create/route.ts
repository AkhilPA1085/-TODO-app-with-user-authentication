import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Post from '@/models/postModel'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqestBody = await request.json();
        const { todo, userId,status,end_date,assignedTo } = reqestBody;

        const user = await User.findOne({ _id: userId })
        if (user) {
            const newPost = new Post({
                todo: todo,
                userId: userId,
                assignedTo:assignedTo,
                status:status,
                end_date:end_date
            })
            let savedData = await newPost.save();
            return NextResponse.json({message:'Post added',success:true,savedData},{status:201})
        }else{
            return NextResponse.json({error:'Unauthorized entry',success:false},{status:400})
        }
    } catch (error:any) {
        return NextResponse.json({ error: error.errors, success: false }, { status: 500 })
    }
}