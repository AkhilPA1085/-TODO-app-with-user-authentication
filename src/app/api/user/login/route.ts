import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { email, password } = requestBody;

        // find user 
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: 'No email exists', success: false }, { status: 200 })
        }

        // compare password
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: 'incorrect password', success: false }, { status: 400 })
        }

        // create token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
            isVerified:user.isVerified
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response = NextResponse.json({message:'Login Success',success:true,token},{status:201})

        response.cookies.set('token',token,{
            httpOnly:true
        })
        return response;
        
    } catch (error) {
        console.log(error)
    }
}