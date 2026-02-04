import mongoose from "mongoose";
import "dotenv/config"

async function connectToDB(){
try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
}
catch(error){
    console.log("Db error",error)
}
}
export default connectToDB;