import { Router } from "express";
import {
  registerController,
  getAllResidentController,
  loginController,
  updateResidentController,
  getResidentById,
} from "../controllers/resident.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const residentRouter = Router();

residentRouter.get("/", getAllResidentController);
residentRouter.get("/:id", getResidentById);
residentRouter.put("/:id", upload.single("file"), updateResidentController);
residentRouter.post("/register", upload.single("file"), registerController);
residentRouter.post("/login", loginController);
export default residentRouter;
