import { Router } from "express";
import {
  addEntryController,
  getAllEntryController,
} from "../controllers/entry.controller.js";
import { verifyUser } from "../middleware/middleware.js";

const entryRouter = Router();

entryRouter.get("/", verifyUser, getAllEntryController);
entryRouter.post("/", addEntryController);

export default entryRouter;
