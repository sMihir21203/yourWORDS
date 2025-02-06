import {Router} from "express"
import { signUpUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/sign-up").post(signUpUser);

export default userRouter;
