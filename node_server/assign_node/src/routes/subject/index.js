import { Router } from "express";
import upload from "../../middleware/fileUpload/image.js";
import protectRoute from "../../middleware/auth/index.js";
import subjectController from "../../controller/subject/index.js";

const subjectRouter = Router();

subjectRouter.post(
  "/",
  protectRoute,
  upload.single("subjectImg"),
  subjectController.createSubject
);

subjectRouter.get("/", protectRoute, subjectController.getSubjects);

subjectRouter.delete("/:id", protectRoute, subjectController.deleteSubject);

subjectRouter.put("/:id", protectRoute, subjectController.updateSubject);

export default subjectRouter;
