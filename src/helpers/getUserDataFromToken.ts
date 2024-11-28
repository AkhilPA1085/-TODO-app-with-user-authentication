import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

interface DecodedToken{
    id:string
}

export const getUserDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';

        const decodeToken = jwt.verify(token,process.env.TOKEN_SECRET!) as DecodedToken;
        return decodeToken?.id;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unknown error occurred');
    }
}