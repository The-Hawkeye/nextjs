"use client"
import React, { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function  UserProfile ({params}:any) {

  const [data, setData] = useState("Nothing")

  const router = useRouter();

  const logout  = async()=>{
    const response = await axios.get("/api/users/logout")
    router.push("/login");


  }

  const getUserDetails = async()=>{
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)

  }
  return (
    <div>
        <h1>User Profile Give Id in params</h1>
        {/* <h3>parms from url {params.id}</h3> */}
        <h2>{data==="Nothing"?"Nothing Here":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>

        <hr/>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get user Details</button>
    </div>
  )
}
