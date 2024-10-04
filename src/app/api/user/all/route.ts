import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(){
    try {
        const users = await User.find().select('-password -forgotPasswordToken -forgotPasswordTokenExpiry');
        return NextResponse.json({success:true,data:users},{status:201})
    } catch (error) {
        return NextResponse.json({success:false,error:error},{status:500})
    }
}