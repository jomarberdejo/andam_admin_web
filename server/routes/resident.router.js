import { Router } from "express";
import {
  registerController,
  getAllResidentController,
} from "../controllers/resident.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const residentRouter = Router();

residentRouter.get("/", getAllResidentController);
residentRouter.post("/", upload.single("file"), registerController);

export default residentRouter;
