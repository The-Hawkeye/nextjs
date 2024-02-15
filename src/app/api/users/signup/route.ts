import {connect} from "@/dbConfig/dbConfig";

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();


export async function POST(request:NextRequest){
    try{
        const reqBody  = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody)

        //check if user already exists

        const user = await User.findOne({email});
        console.log(user,"user from findone")
        if(user){
            return NextResponse.json({
                message:"user already exists",
                status:400
            })
        }


        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log(hashedPassword,"hashedPassword");

        //create user and save in db
        const newUser  = new User({
            username,
            email,
            password:hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser,"saveduser")


        //send verification email after the successfull signup

            await sendMail({email, emailType:"VERIFY", userId:savedUser._id})
        return NextResponse.json({
            message:"User created Successfully",
            success:true,
            savedUser
        })

    }catch(error:any){
        return NextResponse.json({
            error:error.message,
            status:500
        })
    }
}