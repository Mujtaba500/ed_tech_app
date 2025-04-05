import { Router } from "express";
import userRouter from "./user/index.js";
import subjectRouter from "./subject/index.js";
import lessonRouter from "./lesson/index.js";

const mainRouter = Router();

mainRouter.use("/auth", userRouter);

mainRouter.use("/subject", subjectRouter);

const allRoutes = [lessonRouter];

export default allRoutes;
export { mainRouter };
