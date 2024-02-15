import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{

        const response = NextResponse.json({
            message:"Logged Out Successfully",
            status:200
        });

        response.cookies.set("token", "", {
            httpOnly:true,
            expires:Date.now()
        })

        return response;

    }catch(err:any){
        return NextResponse.json({
            error:err.message,
            status:500
        })
    }
}