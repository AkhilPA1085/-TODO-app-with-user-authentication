import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const postId = searchParams.get('postId')
        const commentId = searchParams.get('commentId')

        const post = await Post.findById(postId)
        if (!post) {
            return NextResponse.json({ message: 'No Post found', success: false }, { status: 400 })
        }

        const updatedComments = await post.comments.filter((comment: any) => comment?._id.toString() !== commentId)

        post.comments = updatedComments;
        const updatedPost = await post.save();
        return NextResponse.json({ success: true, data: updatedPost }, { status: 201 })

    } catch (error) {
        return NextResponse.json({success:false,data:error},{status:500})
    }
}