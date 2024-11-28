import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Post from '@/models/postModel'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest) {
    try {
        const {ceateData} = await request.json();
        const { todo, userId,status,end_date,assignedTo,comments } = ceateData ?? {};

        const user = await User.findOne({ _id: userId })
        console.log('user',user)
        if (user) {
            const newPost = new Post({
                todo: todo,
                userId: userId,
                assignedTo:assignedTo,
                status:status,
                end_date:end_date,
                comments:comments,
            })
            const savedData = await newPost.save();
            return NextResponse.json({message:'Post added',success:true,savedData},{status:201})
        }else{
            return NextResponse.json({error:'Unauthorized entry',success:false},{status:400})
        }
    } catch (error:unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "An unexpected error occurred", success: false },
            { status: 500 }
        );
    }
}