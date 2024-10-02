import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {newPassword, token} = reqBody;

        const user = await User.findOne(
            {
                forgotPasswordToken:token,
                forgotPasswordTokenExpiry:{ $gt: Date.now() },
            }
        )

        if(!user){
            return NextResponse.json({error:'Invalid or Expired Token'},{ status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword,salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({ message: 'Password has been reset successfully',success:true });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}