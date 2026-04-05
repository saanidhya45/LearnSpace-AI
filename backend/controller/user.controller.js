import { jwtTokenGenerator } from "../config/jwtAuth.js";
import userModel from "../models/user.model.js";

const userRegisterController = async (req, res) => {
    try {

        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                msg : "all the field are required to fill"
            })
        }

        // check if the user already exist with the email or the username
        const isUserAlreadyExist = await userModel.findOne({email : email});

        if(isUserAlreadyExist){
            return res.status(409).json({
                success : false,
                msg : "user already exist with the email"
            })
        }
        // hash the password before saving it to the data base
        
    
        const user = await userModel.create({
            username,
            email,
            password
        })
        // generate a token 
        const payload = {
            id : user._id,
            username : user.username,
        }

        const token = jwtTokenGenerator(payload);
        res.cookie("token", token, {
            httpOnly: true,
            secure : false,
        });



        user.password = undefined;

        return res.status(201).json({
            success: true,
            message : "user created successFully",
            user,
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
        console.log("login api hit");
        const { email, password } = req.body;

        // 1. check user exists\
        const user = await userModel.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                success : false,
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
            httpOnly: true,
            secure : false,
        });
        
        return res.status(200).json({
            success: true,
            msg: "User logged in successfully",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const userGetMeController = async (req, res) => {
    try {
        // try to find the user exist on the data base with with the email

        const user = await userModel.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                msg : "user not found"
            })
        }
        // user.password = undefined; // do not need to add manually
        return res.status(200).json({
            success : true,
            msg : "User found",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            msg : "internal server error"
        })
    }
}

export { userRegisterController, UserLoginController, userGetMeController };