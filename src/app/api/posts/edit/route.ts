import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {editData} = await request.json();
        const {_id,data} = editData ?? {}
        if (!_id) {
            return NextResponse.json({ error: 'Invalid request', success: false }, { status: 400 })
        }
        const post = await Post.findOne({ _id: _id })
        post.data = data;
        await post.save();
        return NextResponse.json({ message: 'post updated', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid', success: false }, { status: 500 })
    }
}