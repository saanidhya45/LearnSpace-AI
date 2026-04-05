import express from "express";
import { UserLoginController, userRegisterController } from "../controller/user.controller.js";
const authRouter = express.Router();


/**
 * @route /api/auth/register
 */


authRouter
.route("/register").post(userRegisterController)


authRouter
.route("/login").post(UserLoginController)


export default authRouter