import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne(
            {
                verifyPasswordToken: token,
                verifyPasswordTokenExpiry: { $gt: Date.now() }
            }
        )
        if(!token && !user){
            return NextResponse.json({error:'Invalid token',success:false},{status:400})
        }

        user.isVerified = true;
        user.verifyPasswordToken = undefined;
        user.verifyPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message:'Email verified successfully',
            success:true
        })
        
    }  catch (error) {
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