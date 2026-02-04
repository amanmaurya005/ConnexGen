import { model, Schema } from "mongoose";

const authSchema=Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true}
},
{timestamps:true}
);
const Auth=model("auth",authSchema,"auth");
export default Auth;