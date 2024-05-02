import { Router } from "express";
import {
  addReportController,
  deleteReportController,
  getAllReportsController,
  getReportController,
  updateReportController,
} from "../controllers/report.controller.js";
import { verifyUser } from "../middleware/middleware.js";

const reportRouter = Router();

reportRouter.get("/", verifyUser, getAllReportsController);
reportRouter.get("/:id", getReportController);
reportRouter.post("/", addReportController);
reportRouter.delete("/:id", deleteReportController);
reportRouter.put("/", verifyUser, updateReportController);

export default reportRouter;
