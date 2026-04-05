import express from "express";
import { userGetMeController, UserLoginController, userRegisterController } from "../controller/user.controller.js";
import { jwtAuthenticator } from "../config/jwtAuth.js";
const authRouter = express.Router();


/**
 * @route /api/auth/register
 */


authRouter
.route("/register").post(userRegisterController)


authRouter
.route("/login").post(UserLoginController)


/**
 * @route /api/auth/getMe
 * @description get current logged in user data 
 * @protected
 */

authRouter
.route("/getMe").get(jwtAuthenticator, userGetMeController)


export default authRouter