import { Router } from "express";
import {
  addFeedbackController,
  getAllFeedbackController,
  getFeedbackByIdController,
} from "../controllers/feedback.controller.js";
import { verifyUser } from "../middleware/middleware.js";
const feedbackRouter = Router();

feedbackRouter.get("/", verifyUser, getAllFeedbackController);
feedbackRouter.get("/:id", verifyUser, getFeedbackByIdController);
feedbackRouter.post("/", addFeedbackController);

export default feedbackRouter;
