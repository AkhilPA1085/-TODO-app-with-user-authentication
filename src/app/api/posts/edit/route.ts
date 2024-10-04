import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { editData } = await request.json();
        const { todo, userId, status, end_date, assignedTo,_id } = editData ?? {}
        if (!userId) {
            return NextResponse.json({ error: 'Invalid request', success: false }, { status: 400 })
        }
        const post = await Post.findOne({ _id: _id })
        post.todo = todo;
        post.userId = userId;
        post.end_date = end_date;
        post.assignedTo = assignedTo;
        post.status = status;
        await post.save();
        return NextResponse.json({ message: 'post updated', success: true }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error, success: false }, { status: 500 })
    }
}