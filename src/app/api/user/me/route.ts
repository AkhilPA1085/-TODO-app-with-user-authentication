import { connect } from "@/dbConfig/dbConfig";
import { getUserDataFromToken } from "@/helpers/getUserDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {
        const userId= await getUserDataFromToken(request)
        const user = await User.findById({_id:userId}).select('-password');
        return NextResponse.json({success:true,user})
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
        );
    }
}