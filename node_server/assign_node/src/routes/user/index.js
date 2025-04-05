import userController from "../../controller/user/index.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.get("/", userController.checkAuth);

export default userRouter;
