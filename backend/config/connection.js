import mongoose from "mongoose";


const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connect mongoDb")
    } catch (error) {
        console.log("connection error", error);
    }
}

export default connectMongoDb;