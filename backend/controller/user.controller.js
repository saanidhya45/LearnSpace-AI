import { jwtTokenGenerator } from "../config/jwtAuth.js";
import userModel from "../models/user.model.js";

const userRegisterController = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(409).json({
                msg : "all the field are required to fill"
            })
        }

        // check if the user already exist with the email or the username
        const isUserAlreadyExist = await userModel.findOne({email : email});

        if(isUserAlreadyExist){
            return res.status(401).json({
                msg : "user already exist with the email"
            })
        }
        // hash the password before saving it to the data base
        
    
        const newUser = await userModel.create({
            username,
            email,
            password
        })
        
        // generate a token 
        const payload = {
            id : newUser._id,
            username : newUser.username,
        }

        const token = jwtTokenGenerator(payload);
        res.cookie("token", token);


        newUser.password = undefined;

        return res.status(201).json({
            message : "user created successFully",
            newUser,
        })

      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : "internal server error"
        })
    }
}

const UserLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. check user exists
        const user = await userModel.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                msg: "Invalid email or password"
            });
        }

        // 2. generate token
        const payload = {
            username: user.username,
            id: user._id
        };

        const token = jwtTokenGenerator(payload);

        // 3. send cookie
        res.cookie("token", token, {
            httpOnly: true, // security
        });

        return res.status(200).json({
            msg: "User logged in successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};

export { userRegisterController, UserLoginController };