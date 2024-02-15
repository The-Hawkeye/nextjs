import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import { NextRequest, NextResponse } from "next/server";
// 1. Connect to the database

connect();

export async function POST(request:NextRequest){
    try{

        const reqBody = await request.json();
        const {email, password} = reqBody;
        if(!email||!password)
        {
            return NextResponse.json({
                error:"Missing email or password",
                status:401
            })
        }
        // Check user exists in db
        const user = await User.findOne({email});
        if(!user)
        {
            return NextResponse.json({
                error:"No account found with this email",
                status:400
            })
        }

        // Validate password
        const res = await bcrypt.compare(password, user.password);
        if(!res)
        {
            return NextResponse.json({
                error:"Invalid password",
                status:403
            });
        }

        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username
        }

        const token  = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        console.log(token);

        const response = NextResponse.json({
            message:"Logged In successfully",
            status:201
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;

    }catch(err:any){
        return NextResponse.json({
            error:err.message,
            status:500
        })
    }
}

