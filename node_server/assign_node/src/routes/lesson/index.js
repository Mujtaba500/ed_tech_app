import { Router } from "express";
import protectRoute from "../../middleware/auth/index.js";
import lessonController from "../../controller/lesson/index.js";
import videoUpload from "../../middleware/fileUpload/video.js";

const lessonRouter = Router()

lessonRouter.post("/lesson/:subjectId", protectRoute,videoUpload.single("video"), lessonController.createLesson)

lessonRouter.get("/lesson/:subjectId", protectRoute, lessonController.getLessons)

lessonRouter.delete("/lesson/:lessonId", protectRoute, lessonController.deleteLesson)

lessonRouter.get("/video", lessonController.streamVideo)

export default lessonRouter