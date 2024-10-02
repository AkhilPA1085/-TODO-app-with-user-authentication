import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const {searchParams} = new URL(request?.url)
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: 'No data found', success: false }, { status: 400 })
        }
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json({ error: 'Post not found', success: false }, { status: 404 });
        }

        return NextResponse.json({ message: 'Post Deleted', success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong', success: false }, { status: 500 })
    }
}