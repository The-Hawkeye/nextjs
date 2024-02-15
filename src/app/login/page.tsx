
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
    <div>
        <h1>{loading?"Processing":"Login Page"}</h1>

        <label htmlFor='email'>Enter your email</label>
        <input className ="text-black p-2 border border-gray-300 rounded-lg" id='email' type='text' placeholder='email' value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})}/>
        <br/>

        <label htmlFor='password'>Enter your password</label>
        <input className ="text-black p-2 border border-gray-300 rounded-lg" id='password' placeholder='password' value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})}/>
        <br/>
        <button className ="p-2 border border-gray-300 rounded-lg" onClick={onLogin}>Login</button>
        <br/>

        <Link className ="p-2 border border-gray-300 rounded-lg" href="/signup">Visit signup page</Link>
    </div>
  )
}
