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
    console.log(res.data.data.id)
    setData(res.data.data.id)

  }
  return (
    <div className="max-w-xs mx-auto mt-10 p-5 border border-gray-300 rounded-lg">
    <h1 className="text-center">User Profile</h1>
    <h2>{data === "Nothing" ? "Nothing Here" : <Link href={`/profile/${data}`} className="text-blue-500">{data}</Link>}</h2>

    <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
        onClick={logout}
    >
        Logout
    </button>

    <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={getUserDetails}
    >
        Get User Details
    </button>
</div>

  )
}
