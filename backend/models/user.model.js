// user model 
import mongoose from "mongoose";

import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : [true, "username is required"],
        unique : true
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password:{
        type : String,
        required: [true, "password is required"]
    }
}, {timestamps: true})



userSchema.methods.comparePassword = async function(userPassword){
    try {
          const isPasswordMatched = await bcrypt.compare(userPassword, this.password);
          return isPasswordMatched;
    } catch (error) {
        throw new (error);
    }
}



userSchema.pre("save", async function(next){
    try {
        const person = this;
        if(!person.isModified("password")) return next;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next;
    } catch (error) {
        console.log(error);
    }
})
const userModel = mongoose.model("User", userSchema);

export default userModel;