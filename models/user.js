import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type:String,
        unique:[true,'Email already exists!'],
        required:[true,'Email is required!'],
    },
    username:{
        type:String,
        required:[true,'Email already exists!'],
        

    },
    image:{
        type: String
    }
})

const User = models.User || model("User",UserSchema); // so we dont create a new user schema each time we call the api

export default User;