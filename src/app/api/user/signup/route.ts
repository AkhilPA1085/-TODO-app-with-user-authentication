import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { sendMail } from "@/helpers/sendMail";

connect()

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { username, email, password } = requestBody

        // check if user already exist
        const user = await User.findOne({ email: email })
        if (user) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 })
        }

        // password hashing
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()

        // send verification email
        await sendMail({email,emailType:'VERIFY',userId:savedUser._id})

        return NextResponse.json({ message: 'User created successfully', success: true, savedUser }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}