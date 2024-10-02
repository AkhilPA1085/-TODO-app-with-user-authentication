import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/sendMail";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email})

        if(!user){
            return NextResponse.json({message:'Invalid email'},{status:400})
        }

        const token_data = {
            id:user?._id,
            email:user?.email,
            username: user.username
        }

        const resetToken = await jwt.sign(token_data,process.env.TOKEN_SECRET!,{expiresIn:'1h'})
        const expiry = Date.now() + 3600000;

        user.forgotPasswordToken = resetToken;
        user.forgotPasswordTokenExpiry = expiry;
        const savedUser = await user.save()


        await sendMail({email,emailType:'RESET',userId:savedUser._id})

        return NextResponse.json({ message: 'Password reset link has been sent to your email.',success:true });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
