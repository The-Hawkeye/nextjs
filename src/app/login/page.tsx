
"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {

  const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        password:"",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
          setButtonDisabled(false)
      }else{
          setButtonDisabled(true)
      }
    },[user])

    const onLogin = async()=>{

      try{
        setLoading(true)
        const response = await axios.post("/api/users/login", user);
        toast.success("Logged in successfully!");
        router.push("/profile")
        

      }catch(err:any){
        console.log(err.message);
        toast.error(err.message);

      }finally{
        setLoading(false)
      }

    }

  return (
  <div className="max-w-xs mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-white  from-slate-400">
    <h1 className="text-xl mb-4">{loading ? "Processing" : "Login Page"}</h1>

    <label htmlFor="email" className="block mb-2">Enter your email</label>
    <input
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg text-black"
        id="email"
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
    />
    
    <label htmlFor="password" className="block mb-2">Enter your password</label>
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
        onClick={onLogin}
    >
        Login
    </button>

    <Link
        className="block text-center text-blue-500"
        href="/signup"
    >
        Visit signup page
    </Link>
</div>

  )
}
