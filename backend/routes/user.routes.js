import {Router} from "express"
import { signInUser, signUpUser } from "../controllers/user.controller.js";
import { uploadData } from "../middlewares/multer.middleware.js";



const userRouter = Router();

userRouter.route("/sign-up").post(uploadData,signUpUser);
userRouter.route("/sign-in").post(uploadData,signInUser)

export default userRouter;
