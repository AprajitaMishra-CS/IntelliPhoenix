import mongoose from "mongoose";
 
export default async function connectDB(){
    try{
        if(!process.env.MONGODB_URL){
            throw new Error("MONGODB_URL is missing from the .env file");
        }

        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB Atlas connected successfully");
    } catch(error) {
        console.error("MongoDB connection failed: ", error.message);
        throw error;
    }
}