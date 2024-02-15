/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
// import {axios} from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"
import axios from "axios";

export default function signup(){

    const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:"",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(user.email.length>0&&user.username.length>0&&user.password.length>0)
        {
            setButtonDisabled(false);
        }
        else
        setButtonDisabled(true)
    },[user])

    const onSignUp = async()=>{
        try{

            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Successfully signed up!", response);  
            setUser({
                email:"",
                password:"",
                username:"",
            });
            toast.success("Successfully signed up! Please login to continue.");
            setTimeout(() => {
                router.push("/login");
            }, 2500);
          
        }catch(err:any){
            console.log(err)
            toast.error(err.message);
        }finally{
            setLoading(false)
        }
    }

    return (
        <div >
            <h1 className="text-center">{loading?"Processing":"Signup Page"}</h1>
            <hr/>
            <label  htmlFor="username">Username</label>
            <input className="text-black p-2 border border-gray-300 rounded-lg" id="username" placeholder="username" type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
            <br/>

            <label htmlFor="email">Email</label>
            <input id="email" className="text-black p-2 border border-gray-300 rounded-lg" type="text" placeholder="email" value={user.email} onChange={(e)=>{setUser({...user, email:e.target.value})}}></input>
            <br/>

            <label htmlFor="password">Password</label>
            <input className="text-black p-2 border border-gray-300 rounded-lg" id="password" type="password" placeholder="password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} />
            <br/>
            <button onClick={onSignUp}>{buttonDisabled?"No Signup":"SignUp"}</button>
            <Link href="/login"> Visit Login Page</Link>
        </div>
    )

}
