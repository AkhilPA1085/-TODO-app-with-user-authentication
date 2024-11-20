import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url)
        const userIds = searchParams.get('userIds')
        if(!userIds){
            return NextResponse.json({message:'Not assigned'})
        }
        const Ids = userIds.split(',')
        const response = await User.find({
            _id: { $in: Ids }
        }).select('-forgotPasswordToken -forgotPasswordTokenExpiry -password')
        return NextResponse.json({ success: true, data: response }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, data: error }, { status: 500 })
    }
}