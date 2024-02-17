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
        <div className="max-w-xs mx-auto mt-10 p-5 border border-gray-300 rounded-lg">
        <h1 className="text-center">{loading ? "Processing" : "Signup Page"}</h1>
        <hr />
    
        <label htmlFor="username" className="block mt-4">Username</label>
        <input
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg text-black"
            id="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
    
        <label htmlFor="email" className="block">Email</label>
        <input
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg text-black"
            id="email"
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
    
        <label htmlFor="password" className="block">Password</label>
        <input
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg text-black"
            id="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
    
        <button
            className="w-full py-2 mb-4 text-white bg-blue-500 rounded-lg"
            onClick={onSignUp}
            disabled={buttonDisabled}
        >
            {buttonDisabled ? "No Signup" : "Signup"}
        </button>
    
        <Link
            className="block text-center text-blue-500"
            href="/login"
        >
            Visit Login Page
        </Link>
    </div>
    
    )

}
