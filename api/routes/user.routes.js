import {Router} from "express"
import { signUpUser } from "../controllers/user.controller.js";
import { uploadData } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/sign-up").post(uploadData,signUpUser);

export default userRouter;
