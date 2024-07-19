import { Router } from "express";
import {
  addAnnouncementController,
  getAllAnnouncementController,
} from "../controllers/announcement.controller.js";

const announcementRouter = Router();

announcementRouter.get("/", getAllAnnouncementController);
announcementRouter.post("/", addAnnouncementController);

export default announcementRouter;
