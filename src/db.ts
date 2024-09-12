import mongoose from "mongoose";

export const Connection = async(url: string) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDb connected successfully");
    } catch (error) {
        console.error("MongoDb not connect",error);
    }
} 