import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

type CommentType = {
    userId?: string,
    comment?: string,
    createdAt?: string,
    _id?:string
}

export async function POST(request: NextRequest) {
    try {
        const { editData } = await request.json();
        const { todo, userId, status, end_date, assignedTo, _id, comments } = editData ?? {}
        if (!userId) {
            return NextResponse.json({ error: 'Invalid request', success: false }, { status: 400 })
        }
        const post = await Post.findOne({ _id: _id })
        post.todo = todo;
        post.userId = userId;
        post.end_date = end_date;
        post.assignedTo = assignedTo;
        post.status = status;
        if (Array.isArray(comments) && comments.length > 0) {
            post.comments = comments.map((comment: CommentType) => ({
                userId: comment?.userId || '',
                comment: comment?.comment || '',
                createdAt: comment?.createdAt || new Date().toISOString()
            }));
        }
        const updatedPost = await post.save();
        return NextResponse.json({ message: 'post updated', success: true, data: updatedPost }, { status: 201 })
    }  catch (error: unknown) {
        let errorMessage = "An unexpected error occurred";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
                details: error instanceof Error ? error.stack : null,
            },
            { status: 500 }
        );
    }
}