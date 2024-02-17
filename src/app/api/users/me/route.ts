import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig";

connect();

import User from "@/models/userModel";
import jwt from "jsonwebtoken"


export async function GET(request:NextRequest) {
    try{

        const user = await  User.findOne({username: 'admin'}); // get the admin user by username

        const token = request.cookies.get("token")?.value; // get the token from cookies

        console.log(token);

        const data  = jwt.decode(token!);

        console.log(data);




       return NextResponse.json({
        message:"This is all about me",
        data:data,
        status:200
       })

    }catch(er