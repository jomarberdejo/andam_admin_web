import { Router } from "express";
import {
  getAllContactsController,
  addContactController,
} from "../controllers/contact.controller.js";
import { verifyUser } from "../middleware/middleware.js";

const contactRouter = Router();

contactRouter.get("/", getAllContactsController);
contactRouter.post("/", verifyUser, addContactController);

export default contactRouter;
