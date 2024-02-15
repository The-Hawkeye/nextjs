//Configuration file mongo db connection

import mongoose from "mongoose";

export async function connect() {
    
    try{

        mongoose.connect(process.env.MONGO_URI!);

        mongoose.connection.on("connected", () => console.log('MongoDB connected successfully'));

        mongoose.connection.on("error", (err)=>{
            console.log(`Error connecting to MongoDB: ${err}`);
        })

    }catch(err)
    {
        console.log("Something went wrong")
        console.log(err);
    }

}