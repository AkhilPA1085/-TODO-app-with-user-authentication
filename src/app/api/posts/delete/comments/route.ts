import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

type Comment ={
    _id: string; 
    userId: string;
    comment: string;
    createdAt: string;
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const postId = searchParams.get('postId')
        const commentId = searchParams.get('commentId')

        const post = await Post.findById(postId)
        if (!post) {
            return NextResponse.json({ message: 'No Post found', success: false }, { status: 400 })
        }

        const updatedComments = await post.comments.filter((comment:Comment) => comment?._id.toString() !== commentId)

        post.comments = updatedComments;
        const updatedPost = await post.save();
        return NextResponse.json({ success: true, data: updatedPost }, { status: 201 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "An unexpected error occurred", success: false },
            { status: 500 }
        );    }
}